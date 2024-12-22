import { join, resolve } from 'path';

import { BaseService } from '../../common';
import { IServiceParams, TCatalogControllersKeys, TCatalogsControllerKey, TToken } from '../../../types';
import { CatalogBaseController } from './controllers/catalog.base.controller';
import { CatalogsController } from './controllers/catalogs.controller';

export { CatalogsController };

export class CatalogService extends BaseService {
    constructor(params: IServiceParams, token?: TToken) {
        super(
            {
                ...params,
                modelsLocation: resolve(join(__dirname, '/models/catalog.swagger.json')),
            },
            token,
        );
    }

    public controller(controller: TCatalogsControllerKey): CatalogsController;
    public controller(controller: TCatalogControllersKeys): CatalogBaseController {
        switch (controller) {
            case 'catalogs':
                return this.initController(CatalogsController);
            default:
                throw new Error(`There is no match for passed name of controller. Passed: ${controller}`);
        }
    }
}
