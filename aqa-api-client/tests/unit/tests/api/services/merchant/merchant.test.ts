import * as path from 'path';

import { SERVICES_PARAMS_SAMPLE } from '../../../../fixtures/services/services.fixture';
import { MerchantController, MerchantHierarchyService } from '../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('../../../../../../src/api/services/merchant/controllers/merchant.controller.ts');

const MerchantControllerMock = MerchantController as jest.MockedClass<typeof MerchantController>;

describe('api > services > merchant', () => {
    test('factory', () => {
        expect.assertions(3);

        const merchantHierarchyService = new MerchantHierarchyService(SERVICES_PARAMS_SAMPLE.services?.merchant!);

        expect(merchantHierarchyService.controller('merchant')).toBeInstanceOf(MerchantController);

        expect(MerchantControllerMock.mock.calls[0]![0].modelsLocation).toContain(
            path.resolve('src/api/services/merchant/models/merchant.swagger.json'),
        );

        expect(MerchantController).toHaveBeenNthCalledWith(1, {
            controllerUrl: SERVICES_PARAMS_SAMPLE.services?.merchant?.serviceUrl,
            modelsLocation: MerchantControllerMock.mock.calls[0]![0].modelsLocation,
        });
    });
});
