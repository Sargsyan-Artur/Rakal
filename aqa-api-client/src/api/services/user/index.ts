import { join, resolve } from 'path';

import { BaseService } from '../../common';
import { IServiceParams, TToken, TUsersControllerKey, TUsersControllerKeys } from '../../../types';
import { UsersController } from './controllers/users.controller';
import { UsersBaseController } from './controllers/users.base.controller';

export { UsersController };

export class UserService extends BaseService {
    constructor(params: IServiceParams, token?: TToken) {
        super(
            {
                ...params,
                modelsLocation: resolve(join(__dirname, '/models/user.swagger.json')),
            },
            token,
        );
    }

    public controller(controller: TUsersControllerKey): UsersController;
    public controller(controller: TUsersControllerKeys): UsersBaseController {
        switch (controller) {
            case 'users':
                return this.initController(UsersController);
            default:
                throw new Error(`There is no match for passed name of controller. Passed: ${controller}`);
        }
    }
}
