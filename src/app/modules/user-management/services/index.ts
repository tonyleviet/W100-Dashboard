import { UserService } from './user.service';
import { ServicesService } from './services.service';

export * from './user.service';
export * from './services.service';

export const MODULES_SERVICES = [
   UserService,
   ServicesService
];
