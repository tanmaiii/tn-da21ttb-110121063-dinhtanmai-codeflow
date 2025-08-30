# Base image with Node.js LTS
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY .env* ./

# Create npmrc to bypass peer deps
RUN echo "legacy-peer-deps=true" > .npmrc

# Install dependencies  
RUN npm install 

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3002

# Copy static files for standalone mode
RUN cp -r .next/static .next/standalone/.next/ || true
RUN cp -r public .next/standalone/ || true

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3002
ENV HOSTNAME=0.0.0.0

# Start application with Node.js directly (standalone mode)
CMD ["node", ".next/standalone/server.js"]
