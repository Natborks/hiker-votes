variable "region" {
  default = "us-east-1"
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
  description = "frontend docker image uri v2"
  sensitive   = true
}

variable "nginx_image_uri" {
  description = "nginx docker image uri"
  sensitive   = true
}