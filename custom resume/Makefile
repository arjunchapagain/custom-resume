# Resume Builder Docker Makefile

.PHONY: help build build-dev up up-dev down logs clean restart backup

# Default target
help:
	@echo "Resume Builder Docker Commands"
	@echo "=============================="
	@echo "build      - Build production Docker image"
	@echo "build-dev  - Build development Docker image"
	@echo "up         - Start production environment"
	@echo "up-dev     - Start development environment"
	@echo "down       - Stop all services"
	@echo "logs       - View logs"
	@echo "clean      - Remove containers and images"
	@echo "restart    - Restart all services"
	@echo "backup     - Backup database"
	@echo "shell      - Access application container shell"
	@echo "db-shell   - Access database shell"

# Build commands
build:
	@echo "Building production image..."
	npm run build
	docker build -t resume-builder:latest .

build-dev:
	@echo "Building development image..."
	docker build -f Dockerfile.dev -t resume-builder:dev .

# Run commands
up:
	@echo "Starting production environment..."
	docker-compose up -d
	@echo "Application available at: http://localhost:5000"

up-dev:
	@echo "Starting development environment..."
	docker-compose -f docker-compose.dev.yml up -d
	@echo "Development server available at: http://localhost:5000"

# Management commands
down:
	@echo "Stopping all services..."
	docker-compose down
	docker-compose -f docker-compose.dev.yml down 2>/dev/null || true

logs:
	docker-compose logs -f

restart:
	@echo "Restarting services..."
	docker-compose restart

# Utility commands
clean:
	@echo "Cleaning up containers and images..."
	docker-compose down -v
	docker-compose -f docker-compose.dev.yml down -v 2>/dev/null || true
	docker rmi resume-builder:latest resume-builder:dev 2>/dev/null || true
	docker system prune -f

backup:
	@echo "Creating database backup..."
	@DATE=$$(date +%Y%m%d_%H%M%S); \
	docker-compose exec postgres pg_dump -U postgres resume_builder > "backup_$$DATE.sql" && \
	echo "Backup created: backup_$$DATE.sql"

shell:
	docker-compose exec app sh

db-shell:
	docker-compose exec postgres psql -U postgres -d resume_builder

# Quick development setup
dev-setup: build-dev up-dev
	@echo "Development environment is ready!"

# Production deployment
deploy: build up
	@echo "Production deployment completed!"

# Status check
status:
	@echo "Container Status:"
	docker-compose ps
	@echo "\nImage Status:"
	docker images | grep resume-builder