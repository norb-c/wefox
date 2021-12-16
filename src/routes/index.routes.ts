import { Router } from 'express';
import WeatherController from '../controllers/WeatherController';
import AuthMiddleware from '../middlewares/auth.middleware';
import { validateSchema } from '../middlewares/validator.middleware';
import { appContainer } from '../config/inversify.config';
import { loginSchema, registerSchema } from '../validations/auth.schema';
import { addressSchema } from '../validations/weather.schema';
import AuthController from '../controllers/AuthController';

export const routes = (): Router => {
  const router = Router();

  const weatherController = appContainer.get(WeatherController);
  const authController = appContainer.get(AuthController);

  router.post('/auth', validateSchema(loginSchema), authController.login);
  router.post('/auth/register', validateSchema(registerSchema), authController.register);
  router.post('/address', validateSchema(addressSchema), weatherController.getAddress);
  router.get('/health', (req, res) => res.send('Weather API'));

  const authMiddleware = appContainer.get(AuthMiddleware);

  router.use(authMiddleware.authenticate);

  router.post('/weather', validateSchema(addressSchema), weatherController.getWeather);

  return router;
};
