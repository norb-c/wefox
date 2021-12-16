import { Container } from 'inversify';
import AuthService from '../services/AuthService';
import { IAuthService } from '../interfaces/auth.interface';
import AuthController from '../controllers/AuthController';
import WeatherController from '../controllers/WeatherController';
import UtilityService from '../services/UtilityService';
import WeatherService from '../services/WeatherService';
import { IPackages, Packages } from '../common/Packages';
import AuthMiddleware from '../middlewares/auth.middleware';
import { UserRepository } from '../repositories/UserRepository';

const appContainer = new Container();

appContainer.bind<IAuthService>(AuthService).toSelf();

appContainer.bind<WeatherService>(WeatherService).toSelf();
appContainer.bind<UserRepository>(UserRepository).toSelf();
appContainer.bind<AuthController>(AuthController).toSelf();
appContainer.bind<AuthMiddleware>(AuthMiddleware).toSelf();
appContainer.bind<WeatherController>(WeatherController).toSelf();

appContainer.bind<UtilityService>(UtilityService).toSelf();

appContainer.bind<IPackages>(Packages).toSelf();

export { appContainer };
