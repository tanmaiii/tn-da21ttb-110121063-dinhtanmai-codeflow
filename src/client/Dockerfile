# Base image với Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Bỏ qua lỗi peer dependencies nếu có
RUN echo "legacy-peer-deps=true" > .npmrc

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ source code
COPY . .

# Build ứng dụng Next.js
RUN npm run build

# Mở port ứng dụng
EXPOSE 3002

# Thiết lập biến môi trường mặc định
ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME=0.0.0.0

# Chạy ứng dụng bằng npm start
CMD ["npm", "start"]
