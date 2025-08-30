# 🐳 Docker cho CodeFlow

Cấu hình Docker đơn giản cho dự án CodeFlow.

## 🚀 Cài đặt nhanh

### 1. Thiết lập
```bash
# Copy environment file
cp .env.example .env

# Chỉnh sửa .env theo nhu cầu
# vim .env

# Build và start
docker-compose up -d
```

### 2. Truy cập ứng dụng
- **Frontend**: http://localhost:3002
- **Backend API**: http://localhost:3001  
- **Database**: localhost:3306
- **Redis**: localhost:6379

## 🛠️ Lệnh cơ bản

```bash
# Start
docker-compose up -d

# Stop  
docker-compose down

# Xem logs
docker-compose logs -f

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

## 📁 Cấu trúc

```
codeflow/
├── docker-compose.yml      # Docker services
├── .env.example           # Environment template
├── scripts/
│   ├── docker-setup.sh    # Setup script
│   └── docker-prod.sh     # Management script
└── src/
    ├── client/Dockerfile  # Frontend image
    └── server/Dockerfile  # Backend image
```

## ⚙️ Scripts (Linux/macOS)

```bash
# Setup
./scripts/docker-setup.sh

# Management
./scripts/docker-prod.sh start    # Start
./scripts/docker-prod.sh stop     # Stop
./scripts/docker-prod.sh restart  # Restart
./scripts/docker-prod.sh rebuild  # Rebuild
./scripts/docker-prod.sh status   # Status
./scripts/docker-prod.sh logs     # Logs
```

## 🔧 Environment (.env)

```env
# Environment
NODE_ENV=production

# Database
DB_ROOT_PASSWORD=your_password
DB_DATABASE=codeflow
DB_USER=codeflow_user
DB_PASSWORD=your_password

# Ports
BACKEND_PORT=3001
FRONTEND_PORT=3002

# URLs
NEXT_PUBLIC_API_URL=http://localhost:3001
ORIGIN=http://localhost:3002
```

## 🔄 Development Mode

Chỉ cần đặt `NODE_ENV=development` trong .env

## 📝 Services

- **mysql**: MySQL 8.0 database
- **backend**: Node.js Express API  
- **frontend**: Next.js application
- **redis**: Redis cache

## 🐛 Troubleshooting

```bash
# Kiểm tra containers
docker-compose ps

# Xem logs
docker-compose logs [service_name]

# Restart service
docker-compose restart [service_name]

# Clean rebuild
docker-compose down
docker system prune -a
docker-compose build --no-cache
docker-compose up -d
```

Đó là tất cả! 🎉