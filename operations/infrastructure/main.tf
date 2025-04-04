provider "aws" {
  region = var.aws_region
}

# S3 bucket for web assets
resource "aws_s3_bucket" "web_bucket" {
  bucket = "${var.environment}-patient-advocacy-web"
  
  tags = {
    Name        = "${var.environment}-patient-advocacy-web"
    Environment = var.environment
    Project     = "patient-advocacy"
  }
}

# Bucket ACL
resource "aws_s3_bucket_ownership_controls" "web_bucket" {
  bucket = aws_s3_bucket.web_bucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "web_bucket" {
  bucket = aws_s3_bucket.web_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Bucket policy for CloudFront access
resource "aws_s3_bucket_policy" "web_bucket_policy" {
  bucket = aws_s3_bucket.web_bucket.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect    = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.web_oai.iam_arn
        }
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.web_bucket.arn}/*"
      }
    ]
  })
}

# CloudFront distribution
resource "aws_cloudfront_origin_access_identity" "web_oai" {
  comment = "OAI for ${var.environment} Patient Advocacy Web"
}

resource "aws_cloudfront_distribution" "web_distribution" {
  origin {
    domain_name = aws_s3_bucket.web_bucket.bucket_regional_domain_name
    origin_id   = "web-s3-origin"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.web_oai.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_100"

  aliases = ["${var.environment == "prod" ? "" : "${var.environment}."}app.patientadvocacy.example.com"]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "web-s3-origin"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  # Special cache behavior for SPA route handling
  custom_error_response {
    error_code         = 403
    response_code      = 200
    response_page_path = "/index.html"
  }

  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = var.ssl_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2019"
  }

  tags = {
    Name        = "${var.environment}-patient-advocacy-web-distribution"
    Environment = var.environment
    Project     = "patient-advocacy"
  }
}
