import { join, resolve } from 'path';

import { BaseService } from '../../common';
import { CommerceAdapterBaseController } from './controllers/commerce.adapter.base.controller';
import { CategoriesAdapterController } from './controllers/categories.adapter.controller';
import { IServiceParams, TCategoriesAdapterKey, TCommerceAdapterControllersKey, TToken } from '../../../types';

export { CategoriesAdapterController };

export class CommerceAdapterService extends BaseService {
    constructor(params: IServiceParams, token?: TToken) {
        super(
            {
                ...params,
                modelsLocation: resolve(join(__dirname, '/models/commerce.adapter.swagger.json')),
            },
            token,
        );
    }

    public controller(controller: TCategoriesAdapterKey): CategoriesAdapterController;
    public controller(controller: TCommerceAdapterControllersKey): CommerceAdapterBaseController {
        switch (controller) {
            case 'categories':
                return this.initController(CategoriesAdapterController);
            default:
                throw new Error(`There is no match for passed name of controller. Passed: ${controller}`);
        }
    }
}
