import { Gateway } from '../../../../../src/api/gateway';
import { WEB_GATEWAY_PARAMS_SAMPLE, WEB_URLS_SAMPLE } from '../../../fixtures/services/services.fixture';

describe('api > gateway', () => {
    test('instance. Positive', () => {
        expect.assertions(1);

        expect(new Gateway(WEB_GATEWAY_PARAMS_SAMPLE.gateway).urls()).toStrictEqual(WEB_URLS_SAMPLE);
    });

    test('instance. Negative', () => {
        expect.assertions(2);

        expect(() => new Gateway().urls()).toThrow('Please specify configuration params for gateway');
        // @ts-ignore
        expect(() => new Gateway({ gatewayUrl: '', type: 'mock' }).urls()).toThrow("Available 'web' gateway only. Current: 'mock'");
    });
});
