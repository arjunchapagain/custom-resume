# Docker Deployment Guide

This guide explains how to deploy the Resume Builder application using Docker containers.

## Prerequisites

- Docker Engine (version 20.10 or higher)
- Docker Compose (version 1.29 or higher)
- At least 2GB of available RAM
- 1GB of free disk space

## Quick Start

### Option 1: Using the Build Script (Recommended)

```bash
# Make the script executable (if not already done)
chmod +x scripts/docker-build.sh

# Build and run production environment
./scripts/docker-build.sh

# Or build development environment
./scripts/docker-build.sh -e development
```

### Option 2: Manual Docker Commands

#### Production Deployment

```bash
# 1. Build the application
npm run build

# 2. Build Docker image
docker build -t resume-builder:latest .

# 3. Start with Docker Compose
docker-compose up -d
```

#### Development Environment

```bash
# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up -d
```

## Configuration

### Environment Variables

Create a `.env` file in the project root for custom configuration:

```env
# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/resume_builder

# Application Configuration
NODE_ENV=production
PORT=5000

# Optional: Custom database credentials
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=your_database_name
```

### Custom Database

If you want to use an external PostgreSQL database:

```bash
# Update docker-compose.yml to remove the postgres service
# and set DATABASE_URL to your external database
docker-compose up -d app
```

## Available Services

### Production (docker-compose.yml)
- **Application**: http://localhost:5000
- **Database**: PostgreSQL on localhost:5432

### Development (docker-compose.dev.yml)
- **Application**: http://localhost:5000 (with hot reload)
- **Database**: PostgreSQL on localhost:5432

## Docker Commands

### Building Images

```bash
# Build production image
docker build -t resume-builder:latest .

# Build development image
docker build -f Dockerfile.dev -t resume-builder:dev .

# Build with custom tag
docker build -t resume-builder:v1.0.0 .
```

### Running Containers

```bash
# Start production environment
docker-compose up -d

# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Start with logs visible
docker-compose up

# Start specific service
docker-compose up -d postgres
```

### Managing Containers

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f app

# Stop all services
docker-compose down

# Stop and remove volumes (destroys database data)
docker-compose down -v

# Restart services
docker-compose restart

# Update and restart
docker-compose pull && docker-compose up -d
```

### Database Operations

```bash
# Access PostgreSQL container
docker-compose exec postgres psql -U postgres -d resume_builder

# Backup database
docker-compose exec postgres pg_dump -U postgres resume_builder > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres resume_builder < backup.sql

# View database logs
docker-compose logs postgres
```

## Production Deployment

### Using Docker Hub

```bash
# Tag image for Docker Hub
docker tag resume-builder:latest yourusername/resume-builder:latest

# Push to Docker Hub
docker push yourusername/resume-builder:latest

# Pull and run on production server
docker pull yourusername/resume-builder:latest
docker-compose up -d
```

### Using a Registry

```bash
# Tag for private registry
docker tag resume-builder:latest registry.example.com/resume-builder:latest

# Push to private registry
docker push registry.example.com/resume-builder:latest
```

## Health Checks

The application includes health checks:

```bash
# Check container health
docker-compose ps

# Manual health check
curl -f http://localhost:5000/ || echo "Service is down"
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using port 5000
   lsof -i :5000
   
   # Use different port
   PORT=3000 docker-compose up -d
   ```

2. **Database connection issues**
   ```bash
   # Check database logs
   docker-compose logs postgres
   
   # Restart database
   docker-compose restart postgres
   ```

3. **Build failures**
   ```bash
   # Clear build cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100

# Debug specific container
docker-compose exec app sh
```

### Performance Optimization

```bash
# Limit memory usage
docker-compose up -d --memory=1g

# Set CPU limits
docker-compose up -d --cpus=0.5

# Monitor resource usage
docker stats
```

## Security Considerations

1. **Change default passwords** in production
2. **Use environment variables** for sensitive data
3. **Enable SSL/TLS** for production deployments
4. **Regularly update** base images
5. **Scan images** for vulnerabilities:
   ```bash
   docker scan resume-builder:latest
   ```

## Backup and Recovery

### Automated Backups

Create a backup script:

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec postgres pg_dump -U postgres resume_builder > "backup_${DATE}.sql"
```

### Recovery

```bash
# Stop application
docker-compose stop app

# Restore database
docker-compose exec -T postgres psql -U postgres resume_builder < backup_file.sql

# Start application
docker-compose start app
```

## Scaling

For high-traffic deployments:

```bash
# Scale application containers
docker-compose up -d --scale app=3

# Use load balancer (nginx example)
# Add nginx service to docker-compose.yml
```

## Monitoring

Set up monitoring with:
- **Logs**: Centralized logging with ELK stack
- **Metrics**: Prometheus + Grafana
- **Health checks**: Custom health endpoints
- **Alerts**: Based on container status

## Support

For issues with Docker deployment:
1. Check the logs: `docker-compose logs`
2. Verify prerequisites are met
3. Check firewall settings
4. Ensure sufficient disk space and memory