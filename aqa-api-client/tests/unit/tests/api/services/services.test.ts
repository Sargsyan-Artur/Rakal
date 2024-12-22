import {
    AuthService,
    CatalogService,
    CommerceAdapterService,
    JobService,
    MerchantHierarchyService,
    ProductService,
    Services,
    UserService,
} from '../../../../../src/api/services';
import { SERVICES_PARAMS_SAMPLE, TOKEN_SAMPLE } from '../../../fixtures/services/services.fixture';

jest.mock('log4js');
jest.mock('../../../../../src/api/services/merchant/index.ts');
jest.mock('../../../../../src/api/services/product/index.ts');
jest.mock('../../../../../src/api/services/auth/index.ts');
jest.mock('../../../../../src/api/services/job/index.ts');
jest.mock('../../../../../src/api/services/catalog/index.ts');
jest.mock('../../../../../src/api/services/commerce-adapter/index.ts');
jest.mock('../../../../../src/api/services/user/index.ts');

describe('api > services', () => {
    test('factory', () => {
        expect.assertions(14);

        const services = new Services(SERVICES_PARAMS_SAMPLE.services!, TOKEN_SAMPLE);

        expect(services.service('product')).toBeInstanceOf(ProductService);
        expect(ProductService).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services?.product, TOKEN_SAMPLE);

        expect(services.service('merchant-hierarchy')).toBeInstanceOf(MerchantHierarchyService);
        expect(MerchantHierarchyService).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services?.merchant, TOKEN_SAMPLE);

        expect(services.service('auth')).toBeInstanceOf(AuthService);
        expect(AuthService).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services?.auth, TOKEN_SAMPLE);

        expect(services.service('job')).toBeInstanceOf(JobService);
        expect(JobService).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services?.job, TOKEN_SAMPLE);

        expect(services.service('catalog')).toBeInstanceOf(CatalogService);
        expect(CatalogService).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services?.catalog, TOKEN_SAMPLE);

        expect(services.service('commerce-adaptor')).toBeInstanceOf(CommerceAdapterService);
        expect(CommerceAdapterService).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor, TOKEN_SAMPLE);

        expect(services.service('user')).toBeInstanceOf(UserService);
        expect(UserService).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services?.user, TOKEN_SAMPLE);
    });
});
