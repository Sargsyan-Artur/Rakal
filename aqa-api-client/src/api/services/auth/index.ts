import { join, resolve } from 'path';

import { BaseService } from '../../common';
import { IServiceParams, TAuthControllerKey, TAuthControllersKeys, TToken } from '../../../types';
import { AuthBaseController } from './controllers/auth.base.controller';
import { AuthController } from './controllers/auth.controller';

export { AuthController };

export class AuthService extends BaseService {
    constructor(params: IServiceParams, token?: TToken) {
        super(
            {
                ...params,
                modelsLocation: resolve(join(__dirname, '/models/auth.swagger.json')),
            },
            token,
        );
    }

    public controller(controller: TAuthControllerKey): AuthController;
    public controller(controller: TAuthControllersKeys): AuthBaseController {
        switch (controller) {
            case 'auth':
                return this.initController(AuthController);
            default:
                throw new Error(`There is no match for passed name of controller. Passed: ${controller}`);
        }
    }
}
