#!/bin/bash

# Docker Build and Deploy Script for Resume Builder

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default values
IMAGE_NAME="resume-builder"
TAG="latest"
ENVIRONMENT="production"

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
usage() {
    echo "Usage: $0 [OPTIONS]"
    echo "Options:"
    echo "  -e, --env ENVIRONMENT    Set environment (development|production) [default: production]"
    echo "  -t, --tag TAG           Set image tag [default: latest]"
    echo "  -n, --name NAME         Set image name [default: resume-builder]"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                      # Build production image with default settings"
    echo "  $0 -e development       # Build development image"
    echo "  $0 -t v1.0.0           # Build with specific tag"
    echo "  $0 --name my-resume-app # Build with custom name"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--env)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -t|--tag)
            TAG="$2"
            shift 2
            ;;
        -n|--name)
            IMAGE_NAME="$2"
            shift 2
            ;;
        -h|--help)
            usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            usage
            exit 1
            ;;
    esac
done

# Validate environment
if [[ "$ENVIRONMENT" != "development" && "$ENVIRONMENT" != "production" ]]; then
    print_error "Environment must be 'development' or 'production'"
    exit 1
fi

print_status "Starting Docker build process..."
print_status "Environment: $ENVIRONMENT"
print_status "Image Name: $IMAGE_NAME"
print_status "Tag: $TAG"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build the application first
print_status "Building the application..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Application build failed"
    exit 1
fi

# Build Docker image based on environment
if [ "$ENVIRONMENT" = "development" ]; then
    print_status "Building development Docker image..."
    docker build -f Dockerfile.dev -t "${IMAGE_NAME}:${TAG}-dev" .
    FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}-dev"
else
    print_status "Building production Docker image..."
    docker build -f Dockerfile -t "${IMAGE_NAME}:${TAG}" .
    FULL_IMAGE_NAME="${IMAGE_NAME}:${TAG}"
fi

if [ $? -ne 0 ]; then
    print_error "Docker build failed"
    exit 1
fi

print_status "Docker image built successfully: $FULL_IMAGE_NAME"

# Show image details
print_status "Image details:"
docker images | grep "$IMAGE_NAME" | head -1

# Optional: Run the container
echo ""
read -p "Do you want to start the container now? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ "$ENVIRONMENT" = "development" ]; then
        print_status "Starting development environment with Docker Compose..."
        docker-compose -f docker-compose.dev.yml up -d
    else
        print_status "Starting production environment with Docker Compose..."
        docker-compose up -d
    fi
    
    if [ $? -eq 0 ]; then
        print_status "Container started successfully!"
        print_status "Application is available at: http://localhost:5000"
        print_status "Use 'docker-compose logs -f' to view logs"
        print_status "Use 'docker-compose down' to stop the container"
    else
        print_error "Failed to start container"
        exit 1
    fi
fi

print_status "Build process completed successfully!"