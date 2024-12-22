import { ApiClient } from '../../../../src/api/client';
import { Services } from '../../../../src/api/services';
import { WEB_GATEWAY_PARAMS_SAMPLE, SERVICES_PARAMS_SAMPLE, TOKEN_SAMPLE, WEB_URLS_SAMPLE } from '../../fixtures/services/services.fixture';

jest.mock('log4js');
jest.mock('../../../../src/api/services/index.ts');

describe('api > client', () => {
    test('instance without gateway', () => {
        expect.assertions(2);

        const apiClient = new ApiClient(SERVICES_PARAMS_SAMPLE, TOKEN_SAMPLE);

        expect(apiClient.services).toBeInstanceOf(Services);
        expect(Services).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services, TOKEN_SAMPLE);
    });

    test('instance with web gateway', () => {
        expect.assertions(2);

        const apiClient = new ApiClient(WEB_GATEWAY_PARAMS_SAMPLE, TOKEN_SAMPLE);

        expect(apiClient.services).toBeInstanceOf(Services);
        expect(Services).toHaveBeenCalledWith(WEB_URLS_SAMPLE, TOKEN_SAMPLE);
    });

    test('setToken', () => {
        expect.assertions(3);

        const apiClient = new ApiClient(SERVICES_PARAMS_SAMPLE);

        const apiClientMocked = jest.spyOn(apiClient, 'setToken');

        apiClient.setToken(TOKEN_SAMPLE);

        expect(apiClientMocked).toHaveBeenCalledWith(TOKEN_SAMPLE);

        expect(apiClient.services).toBeInstanceOf(Services);
        expect(Services).toHaveBeenCalledWith(SERVICES_PARAMS_SAMPLE.services, TOKEN_SAMPLE);
    });
});
