import { join, resolve } from 'path';

import { BaseService } from '../../common';
import { IServiceParams, TBrandsControllerKey, TProductControllersKeys, TToken } from '../../../types';
import { BrandsController } from './controllers/brands.controller';
import { ProductBaseController } from './controllers/product.base.controller';

export { BrandsController };

export class ProductService extends BaseService {
    constructor(params: IServiceParams, token?: TToken) {
        super(
            {
                ...params,
                modelsLocation: resolve(join(__dirname, '/models/product.swagger.json')),
            },
            token,
        );
    }

    public controller(controller: TBrandsControllerKey): BrandsController;
    public controller(controller: TProductControllersKeys): ProductBaseController {
        switch (controller) {
            case 'brand':
                return this.initController(BrandsController);
            default:
                throw new Error(`There is no match for passed name of controller. Passed: ${controller}`);
        }
    }
}
