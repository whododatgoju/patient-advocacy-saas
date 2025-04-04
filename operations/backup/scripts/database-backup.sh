#!/bin/bash
# Database Backup Script for Patient Advocacy Platform
# This script creates database backups and uploads them to S3

# Configuration
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-patient_advocacy}"
DB_USER="${DB_USER:-postgres}"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/tmp/patient-advocacy-backups"
S3_BUCKET="${S3_BUCKET:-patient-advocacy-backups}"
BACKUP_RETENTION_DAYS=7
LOG_FILE="/var/log/patient-advocacy/db-backup.log"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Log function
log() {
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# Create database backup
create_backup() {
  log "Starting database backup of $DB_NAME"
  
  BACKUP_FILE="$BACKUP_DIR/${DB_NAME}_${TIMESTAMP}.sql.gz"
  
  # Run pg_dump and compress the output
  PGPASSWORD=$DB_PASSWORD pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -F p | gzip > $BACKUP_FILE
  
  if [ $? -eq 0 ]; then
    log "Backup completed successfully: $BACKUP_FILE"
    echo $BACKUP_FILE
  else
    log "ERROR: Database backup failed"
    exit 1
  fi
}

# Upload backup to S3
upload_to_s3() {
  local backup_file=$1
  log "Uploading backup to S3 bucket: $S3_BUCKET"
  
  aws s3 cp $backup_file s3://$S3_BUCKET/database/$(basename $backup_file)
  
  if [ $? -eq 0 ]; then
    log "Successfully uploaded backup to S3"
  else
    log "ERROR: Failed to upload backup to S3"
    exit 1
  fi
}

# Clean up old backups
cleanup() {
  log "Cleaning up local backups older than $BACKUP_RETENTION_DAYS days"
  find $BACKUP_DIR -type f -name "${DB_NAME}_*.sql.gz" -mtime +$BACKUP_RETENTION_DAYS -delete
  
  log "Cleaning up S3 backups older than $BACKUP_RETENTION_DAYS days"
  aws s3 ls s3://$S3_BUCKET/database/${DB_NAME}_*.sql.gz | awk '{print $4}' | while read -r backup_file; do
    backup_date=$(echo $backup_file | sed -E 's/.*_([0-9]{8})_.*/\1/')
    current_date=$(date +%Y%m%d)
    
    # Calculate days difference
    days_diff=$(( ( $(date -d $current_date +%s) - $(date -d $backup_date +%s) ) / 86400 ))
    
    if [ $days_diff -gt $BACKUP_RETENTION_DAYS ]; then
      log "Deleting old S3 backup: $backup_file"
      aws s3 rm s3://$S3_BUCKET/database/$backup_file
    fi
  done
}

# Monitor database connection
check_db_connection() {
  log "Checking database connection"
  PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1" > /dev/null 2>&1
  
  if [ $? -ne 0 ]; then
    log "ERROR: Cannot connect to database"
    exit 1
  fi
  
  log "Database connection successful"
}

# Main execution
main() {
  log "=== Starting backup process ==="
  
  # Validate environment variables
  if [ -z "$DB_PASSWORD" ]; then
    log "ERROR: DB_PASSWORD environment variable is required"
    exit 1
  fi
  
  # Check database connection
  check_db_connection
  
  # Create backup
  backup_file=$(create_backup)
  
  # Upload to S3
  upload_to_s3 $backup_file
  
  # Clean up old backups
  cleanup
  
  log "=== Backup process completed successfully ==="
}

# Run main function
main
