import express from 'express';
import { Errors } from './common/errors';
import { handleErrors } from './middlewares/error.middleware';
import requestLogger from './middlewares/requestLogger.middleware';
import { routes } from './routes/index.routes';
import mongoose from 'mongoose';
import logger from './common/logger';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

class App {
  public app: express.Application;
  public port: string | number;
  public isProd: boolean;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.initializeDB();
    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port} ${process.env.NODE_ENV}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.set('trust proxy', true);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(requestLogger);
  }

  private initializeRoutes() {
    this.app.use('/api/', routes());

    this.app.all('*', (req, res) => {
      return res.status(404).json({
        status: false,
        error: 'not_found',
        message: Errors.RESOURCE_NOT_FOUND,
        path: req.url,
        data: {}
      });
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'Wefox Weather API',
          version: '1.0.0',
          description: 'Wefox weather test api'
        }
      },
      apis: ['swagger.yaml']
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    this.app.use(handleErrors);
  }

  private async initializeDB() {
    await mongoose.connect(process.env.DB_URI, {});
    logger.info('Mongodb connected');
  }
}

export default App;
