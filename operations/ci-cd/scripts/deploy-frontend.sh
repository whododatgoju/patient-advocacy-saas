#!/bin/bash
# Frontend Deployment Script for Patient Advocacy Platform
# This script builds and deploys the frontend React application

set -e

# Configuration
ENVIRONMENT="${ENVIRONMENT:-development}"
PROJECT_DIR="${PROJECT_DIR:-/Users/dianacampos/Desktop/AI Patient Advocacy/patient-advocacy-web}"
BUILD_DIR="${PROJECT_DIR}/dist"
S3_BUCKET="${S3_BUCKET:-dev-patient-advocacy-web}"
CLOUDFRONT_DISTRIBUTION_ID="${CLOUDFRONT_DISTRIBUTION_ID}"
LOG_FILE="./deployment-${ENVIRONMENT}-$(date +%Y%m%d_%H%M%S).log"

# Log function
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# Validate environment
validate_environment() {
  log "Validating environment configuration"
  
  if [ "$ENVIRONMENT" = "production" ]; then
    log "Running in PRODUCTION mode"
    S3_BUCKET="prod-patient-advocacy-web"
    
    # Additional validation for production
    if [ -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
      log "ERROR: CLOUDFRONT_DISTRIBUTION_ID must be set for production deployments"
      exit 1
    fi
  else
    log "Running in $ENVIRONMENT mode"
  fi
  
  # Check AWS credentials
  if ! aws sts get-caller-identity &> /dev/null; then
    log "ERROR: AWS credentials not configured or invalid"
    exit 1
  fi
  
  log "Environment validation complete"
}

# Build the application
build_app() {
  log "Building frontend application for $ENVIRONMENT environment"
  
  # Navigate to project directory
  cd $PROJECT_DIR
  
  # Install dependencies
  log "Installing dependencies"
  npm ci
  
  # Run linter
  log "Running linter"
  npm run lint
  
  # Run tests
  log "Running tests"
  npm test -- --passWithNoTests
  
  # Build for specific environment
  log "Building application"
  npm run build -- --mode $ENVIRONMENT
  
  # Verify build output
  if [ ! -d "$BUILD_DIR" ]; then
    log "ERROR: Build failed, build directory not found"
    exit 1
  fi
  
  log "Build completed successfully"
}

# Deploy to S3
deploy_to_s3() {
  log "Deploying to S3 bucket: $S3_BUCKET"
  
  # Sync build directory to S3, deleting removed files
  aws s3 sync $BUILD_DIR s3://$S3_BUCKET/ --delete
  
  # Set cache control headers
  # Cache HTML files for a shorter time (5 minutes)
  aws s3 cp s3://$S3_BUCKET/ s3://$S3_BUCKET/ --recursive --exclude "*" --include "*.html" --metadata-directive REPLACE --cache-control "max-age=300"
  
  # Cache static assets for a longer time (1 week)
  aws s3 cp s3://$S3_BUCKET/assets/ s3://$S3_BUCKET/assets/ --recursive --metadata-directive REPLACE --cache-control "max-age=604800"
  
  log "S3 deployment completed"
}

# Invalidate CloudFront cache
invalidate_cloudfront() {
  if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
    log "Invalidating CloudFront cache for distribution: $CLOUDFRONT_DISTRIBUTION_ID"
    
    aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
    
    log "CloudFront invalidation initiated"
  else
    log "Skipping CloudFront invalidation (no distribution ID provided)"
  fi
}

# Run post-deployment checks
post_deployment_checks() {
  log "Running post-deployment checks"
  
  # Check if index.html is accessible
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://${ENVIRONMENT}.app.patientadvocacy.example.com/index.html)
  
  if [ "$HTTP_STATUS" -eq 200 ]; then
    log "Website is accessible (HTTP 200)"
  else
    log "WARNING: Website returned HTTP status $HTTP_STATUS"
  fi
  
  # Additional checks could be added here
  
  log "Post-deployment checks completed"
}

# Main execution
main() {
  log "=== Starting frontend deployment for $ENVIRONMENT environment ==="
  
  # Run deployment steps
  validate_environment
  build_app
  deploy_to_s3
  invalidate_cloudfront
  post_deployment_checks
  
  log "=== Deployment completed successfully ==="
}

# Run main function
main
