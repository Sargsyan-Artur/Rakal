import * as path from 'path';

import { SERVICES_PARAMS_SAMPLE } from '../../../../fixtures/services/services.fixture';
import { BrandsController, ProductService } from '../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('../../../../../../src/api/services/product/controllers/brands.controller.ts');

const BrandsControllerMock = BrandsController as jest.MockedClass<typeof BrandsController>;

describe('api > services > product', () => {
    test('factory', () => {
        expect.assertions(3);

        const productService = new ProductService(SERVICES_PARAMS_SAMPLE.services?.product!);

        expect(productService.controller('brand')).toBeInstanceOf(BrandsController);

        expect(BrandsControllerMock.mock.calls[0]![0].modelsLocation).toContain(
            path.resolve('src/api/services/product/models/product.swagger.json'),
        );

        expect(BrandsController).toHaveBeenNthCalledWith(1, {
            controllerUrl: SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl,
            modelsLocation: BrandsControllerMock.mock.calls[0]![0].modelsLocation,
        });
    });
});
