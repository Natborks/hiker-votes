terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
  required_version = ">= 1.3"
}

provider "aws" {
  # Configuration options
  region = "us-east-1"
}

variable "mongodb_uri" {
  description = "atlas mongo db uri"
  sensitive   = true
}

variable "backend_image_uri" {
  description = "backend docker image uri"
  sensitive   = true
}

variable "frontend_image_uri" {
  description = "frontend docker image uri"
  sensitive   = true
}

module "app-module" {
  source = "../app-module"

  mongodb_uri        = var.mongodb_uri
  backend_image_uri  = var.backend_image_uri
  frontend_image_uri = var.frontend_image_uri
}