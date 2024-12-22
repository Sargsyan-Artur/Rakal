import * as path from 'path';

import { SERVICES_PARAMS_SAMPLE } from '../../../../fixtures/services/services.fixture';
import { CommerceAdapterService, CategoriesAdapterController } from '../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('../../../../../../src/api/services/commerce-adapter/controllers/categories.adapter.controller.ts');

const CategoriesAdapterControllerMock = CategoriesAdapterController as jest.MockedClass<typeof CategoriesAdapterController>;

describe('api > services > commerce-adapter', () => {
    test('factory', () => {
        expect.assertions(3);

        const commerceAdapterService = new CommerceAdapterService(SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor!);

        expect(commerceAdapterService.controller('categories')).toBeInstanceOf(CategoriesAdapterController);

        expect(CategoriesAdapterControllerMock.mock.calls[0]![0].modelsLocation).toContain(
            path.resolve('src/api/services/commerce-adapter/models/commerce.adapter.swagger.json'),
        );

        expect(CategoriesAdapterController).toHaveBeenNthCalledWith(1, {
            controllerUrl: SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor?.serviceUrl,
            modelsLocation: CategoriesAdapterControllerMock.mock.calls[0]![0].modelsLocation,
        });
    });
});
