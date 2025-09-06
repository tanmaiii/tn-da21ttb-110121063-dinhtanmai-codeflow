import { LOG_FORMAT, NODE_ENV, PORT } from '@config';
import { DB } from '@database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet'; // bảo vệ header
import hpp from 'hpp'; // bảo vệ header
import { createServer } from 'http';
import morgan from 'morgan'; // log request
import path from 'path';
import 'reflect-metadata';
import { Server } from 'socket.io';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Container } from 'typedi';
import { SocketService } from './services/socket.service';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  private httpServer: any;
  private io: Server;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    this.connectToDatabase();
    this.setupProcessHandlers();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.initializeSocketIO();
  }

  private initializeSocketIO() {
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      pingTimeout: 60000,
      pingInterval: 25000,
      connectTimeout: 45000,
      allowUpgrades: true,
      perMessageDeflate: {
        threshold: 2048,
      },
    });

    // Initialize SocketService
    const socketService = Container.get(SocketService);
    socketService.initialize(this.io);
  }

  public listen() {
    this.httpServer.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    try {
      await DB.sequelize.authenticate();
      logger.info('✅ Database connection has been established successfully.');
      await DB.sequelize.sync({ force: false }); // true nếu muốn xóa bảng cũ và tạo bảng mới
      logger.info('✅ Database synchronized successfully.');
    } catch (error) {
      logger.error('❌ Unable to connect to the database:', error);
      process.exit(1); // Exit cleanly instead of crashing
    }
  }

  private initializeMiddlewares() {
    // Rate limiting
    // const limiter = rateLimit({
    //   windowMs: 15 * 60 * 1000, // 15 minutes
    //   max: 100, // Limit each IP to 100 requests per windowMs
    // });

    // // Apply rate limiting to all requests

    // this.app.use(limiter);

    this.app.use(
      cors({
        origin: (origin, callback) => callback(null, true),
        credentials: true,
      }),
    );
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());

    // Cho phép truy cập file ảnh tĩnh từ /public
    this.app.use('/public/images', express.static(path.join(__dirname, '../uploads/images')));
    this.app.use('/public/files', express.static(path.join(__dirname, '../uploads/files')));
    
    // Thêm route trực tiếp cho uploads directory để hỗ trợ Docker
    this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    
    // Thêm CORS headers cho static files
    this.app.use('/public', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'CodeFlow API',
          version: '1.0.1',
          description: 'CodeFlow API',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }

  private setupProcessHandlers() {
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
      logger.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
      logger.error('❌ Uncaught Exception:', error);
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('🔄 SIGTERM received, shutting down gracefully');
      process.exit(0);
    });

    process.on('SIGINT', () => {
      logger.info('🔄 SIGINT received, shutting down gracefully');
      process.exit(0);
    });
  }
}
