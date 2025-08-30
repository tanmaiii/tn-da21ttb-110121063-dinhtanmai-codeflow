#!/bin/bash

# CodeFlow Docker Management Script

# Check if environment file exists
check_env_file() {
    if [ ! -f ".env" ]; then
        echo "❌ .env file not found!"
        echo "Please run ./scripts/docker-setup.sh first"
        exit 1
    fi
}

# Start environment
start_app() {
    echo "🚀 Starting CodeFlow..."
    docker-compose up -d
    echo "✅ Started successfully!"
    echo "Frontend: http://localhost:3002"
    echo "Backend API: http://localhost:3001"
}

# Stop environment
stop_app() {
    echo "🛑 Stopping CodeFlow..."
    docker-compose down
    echo "✅ Stopped!"
}

# Rebuild and restart
rebuild() {
    echo "🔨 Rebuilding CodeFlow..."
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    echo "✅ Rebuild completed!"
}

# Show logs
logs() {
    if [ -n "$1" ]; then
        docker-compose logs -f "$1"
    else
        docker-compose logs -f
    fi
}

# Show status
status() {
    echo "📊 CodeFlow Status:"
    docker-compose ps
}

# Show help
show_help() {
    echo "CodeFlow Docker Manager"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  start      Start the application"
    echo "  stop       Stop the application"  
    echo "  restart    Restart the application"
    echo "  rebuild    Rebuild and restart"
    echo "  status     Show services status"
    echo "  logs       Show logs"
    echo "  help       Show this help"
}

# Main function
main() {
    check_env_file
    
    case "$1" in
        start)
            start_app
            ;;
        stop)
            stop_app
            ;;
        restart)
            stop_app
            start_app
            ;;
        rebuild)
            rebuild
            ;;
        status)
            status
            ;;
        logs)
            logs "$2"
            ;;
        help|--help|-h)
            show_help
            ;;
        "")
            start_app
            ;;
        *)
            echo "❌ Unknown command: $1"
            show_help
            ;;
    esac
}

# Run main function
main "$@"
