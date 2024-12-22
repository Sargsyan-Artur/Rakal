import { join, resolve } from 'path';

import { BaseService } from '../../common';
import {
    IServiceParams,
    TMerchantAdminControllerKey,
    TMerchantControllerKey,
    TMerchantHierarchyControllersKeys,
    TToken,
} from '../../../types';
import { MerchantController } from './controllers/merchant.controller';
import { MerchantAdminController } from './controllers/merchant.admin.controller';
import { MerchantHierarchyBaseController } from './controllers/merchant.hierarchy.base.controller';

export { MerchantController, MerchantAdminController };

export class MerchantHierarchyService extends BaseService {
    constructor(params: IServiceParams, token?: TToken) {
        super(
            {
                ...params,
                modelsLocation: resolve(join(__dirname, '/models/merchant.swagger.json')),
            },
            token,
        );
    }

    public controller(controller: TMerchantControllerKey): MerchantController;
    public controller(controller: TMerchantAdminControllerKey): MerchantAdminController;
    public controller(controller: TMerchantHierarchyControllersKeys): MerchantHierarchyBaseController {
        switch (controller) {
            case 'merchant':
                return this.initController(MerchantController);
            case 'merchantAdmin':
                return this.initController(MerchantAdminController);
            default:
                throw new Error(`There is no match for passed name of controller. Passed: ${controller}`);
        }
    }
}
