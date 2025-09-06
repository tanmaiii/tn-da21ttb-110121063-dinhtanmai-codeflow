# Docker Setup & Troubleshooting Guide

## 🚀 Khởi động ứng dụng

```bash
# Khởi động tất cả services
docker-compose up -d

# Hoặc build và khởi động
docker-compose up --build -d
```

## 🔧 Khắc phục vấn đề hiển thị hình ảnh

### Vấn đề thường gặp:
- Hình ảnh không hiển thị từ API backend
- Lỗi CORS khi truy cập static files
- Environment variables không đúng

### Giải pháp nhanh:

#### Sử dụng script tự động:
```bash
# Linux/Mac
chmod +x scripts/fix-docker-images.sh
./scripts/fix-docker-images.sh

# Windows PowerShell
.\scripts\fix-docker-images.ps1
```

#### Khắc phục thủ công:

1. **Cập nhật environment variables:**
   ```bash
   # Tạo file .env từ env.example
   cp env.example .env
   
   # Cập nhật NEXT_PUBLIC_API_URL
   # Thay đổi từ: http://localhost:3001
   # Thành: http://backend:3001
   ```

2. **Rebuild containers:**
   ```bash
   docker-compose down
   docker-compose up --build -d
   ```

3. **Kiểm tra logs:**
   ```bash
   # Backend logs
   docker-compose logs backend -f
   
   # Frontend logs
   docker-compose logs frontend -f
   ```

## 📁 Cấu trúc volumes

```
volumes:
  backend_uploads:    # Chứa files upload từ backend
  backend_logs:       # Log files của backend
  mysql_data:         # Database data
  redis_data:         # Redis cache data
```

## 🌐 Network Configuration

- **Frontend**: `http://localhost:3002`
- **Backend**: `http://localhost:3001` (external), `http://backend:3001` (internal)
- **Database**: `mysql:3306` (internal)
- **Redis**: `redis:6379` (internal)

## 🔍 Debug Commands

```bash
# Kiểm tra trạng thái containers
docker-compose ps

# Kiểm tra network
docker network ls
docker network inspect codeflow_codeflow-network

# Kiểm tra volumes
docker volume ls
docker volume inspect codeflow_backend_uploads

# Truy cập container
docker exec -it codeflow-backend sh
docker exec -it codeflow-frontend sh

# Kiểm tra logs real-time
docker-compose logs -f
```

## 📝 Environment Variables Quan trọng

```bash
# Frontend
NEXT_PUBLIC_API_URL=http://backend:3001  # Quan trọng cho Docker!

# Backend
DB_HOST=mysql
DB_PORT=3306
PORT=3001
```

## 🚨 Troubleshooting Checklist

- [ ] File `.env` đã được tạo và cập nhật
- [ ] `NEXT_PUBLIC_API_URL` trỏ đến `http://backend:3001`
- [ ] Tất cả containers đang chạy (`docker-compose ps`)
- [ ] Backend có thể truy cập database
- [ ] Frontend có thể kết nối backend qua internal network
- [ ] Static files được serve đúng cách từ backend

## 📞 Hỗ trợ

Nếu vẫn gặp vấn đề, hãy:
1. Chạy script khắc phục tự động
2. Kiểm tra logs chi tiết
3. Xác nhận network configuration
4. Kiểm tra environment variables