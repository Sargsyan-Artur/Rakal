import * as path from 'path';

import { SERVICES_PARAMS_SAMPLE } from '../../../../fixtures/services/services.fixture';
import { CatalogService, CatalogsController } from '../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('../../../../../../src/api/services/catalog/controllers/catalogs.controller.ts');

const CatalogsControllerMock = CatalogsController as jest.MockedClass<typeof CatalogsController>;

describe('api > services > catalog', () => {
    test('factory', () => {
        expect.assertions(3);

        const catalogService = new CatalogService(SERVICES_PARAMS_SAMPLE.services?.catalog!);

        expect(catalogService.controller('catalogs')).toBeInstanceOf(CatalogsController);

        expect(CatalogsControllerMock.mock.calls[0]![0].modelsLocation).toContain(
            path.resolve('src/api/services/catalog/models/catalog.swagger.json'),
        );

        expect(CatalogsController).toHaveBeenNthCalledWith(1, {
            controllerUrl: SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl,
            modelsLocation: CatalogsControllerMock.mock.calls[0]![0].modelsLocation,
        });
    });
});
