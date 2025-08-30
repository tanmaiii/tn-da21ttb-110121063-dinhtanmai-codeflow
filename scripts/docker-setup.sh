#!/bin/bash

# CodeFlow Docker Setup Script

echo "Setting up CodeFlow Docker environment..."

# Create environment file
if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        cp env.example .env
        echo "✅ Created .env from example"
    else
        echo "❌ env.example file not found"
        exit 1
    fi
else
    echo "⚠️  .env already exists"
fi

# Build Docker images
echo "Building Docker images..."
docker-compose build

echo "🎉 Setup completed! Run: docker-compose up -d"
