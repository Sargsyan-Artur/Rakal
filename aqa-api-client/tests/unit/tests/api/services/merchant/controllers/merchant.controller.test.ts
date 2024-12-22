import got from 'got';
import * as querystring from 'querystring';

import { MerchantController, MerchantHierarchyService, MerchantAdminController } from '../../../../../../../src/api/services';
import { SERVICES_PARAMS_SAMPLE } from '../../../../../fixtures/services/services.fixture';
import {
    ALL_TYPES_POSITIVE,
    CREATE_MERCHANT_NEGATIVE,
    CREATE_MERCHANT_POSITIVE,
    GET_TYPE_CHILDREN_POSITIVE,
    TYPE_WITH_ID_POSITIVE,
    UPDATE_MERCHANT_NEGATIVE,
    UPDATE_MERCHANT_POSITIVE,
} from '../../../../../fixtures/services/merchant/merchant.fixture';

jest.mock('log4js');
jest.mock('got');

describe('api > services > merchant > merchant.controller', () => {
    let merchantController: MerchantController;
    let merchantAdminController: MerchantAdminController;

    beforeEach(() => {
        jest.clearAllMocks();

        const merchantService = new MerchantHierarchyService(SERVICES_PARAMS_SAMPLE.services?.merchant!);
        merchantController = merchantService.controller('merchant');
        merchantAdminController = merchantService.controller('merchantAdmin');
    });

    describe('getMerchants', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await merchantController.getMerchants(ALL_TYPES_POSITIVE);

            const query = querystring.stringify(ALL_TYPES_POSITIVE.positive.query);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.merchant?.serviceUrl}/api/v1/merchants`, {
                method: 'get',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                searchParams: query,
            });
        });
    });

    describe('getMerchantsById', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await merchantController.getMerchantById(TYPE_WITH_ID_POSITIVE);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.merchant?.serviceUrl}/api/v1/merchants/${TYPE_WITH_ID_POSITIVE.positive.path.merchantId}`,
                {
                    method: 'get',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    searchParams: TYPE_WITH_ID_POSITIVE.positive.query,
                },
            );
        });
    });

    describe('getMerchantChildrenById', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await merchantController.getMerchantChildrenById(GET_TYPE_CHILDREN_POSITIVE);

            const query = querystring.stringify(GET_TYPE_CHILDREN_POSITIVE.positive.query);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.merchant?.serviceUrl}/api/v1/merchants/${GET_TYPE_CHILDREN_POSITIVE.positive.path.merchantId}/children`,
                {
                    method: 'get',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    searchParams: query,
                },
            );
        });
    });

    describe('createMerchant', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await merchantAdminController.createMerchant(CREATE_MERCHANT_POSITIVE);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.merchant?.serviceUrl}/api/v1/admin/merchants`, {
                method: 'post',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: CREATE_MERCHANT_POSITIVE.positive.body,
            });
        });

        test('With negative params', async () => {
            expect.assertions(1);

            await merchantAdminController.createMerchant(CREATE_MERCHANT_NEGATIVE);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.merchant?.serviceUrl}/api/v1/admin/merchants`, {
                method: 'post',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: CREATE_MERCHANT_NEGATIVE.negative.body,
            });
        });
    });

    describe('updateMerchant', () => {
        test('With positive params', async () => {
            expect.assertions(1);

            await merchantAdminController.updateMerchant(UPDATE_MERCHANT_POSITIVE);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.merchant?.serviceUrl}/api/v1/admin/merchants/${UPDATE_MERCHANT_POSITIVE.positive.path.merchantId}`,
                {
                    method: 'put',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: CREATE_MERCHANT_POSITIVE.positive.body,
                },
            );
        });

        test('With negative params', async () => {
            expect.assertions(1);

            await merchantAdminController.updateMerchant(UPDATE_MERCHANT_NEGATIVE);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.merchant?.serviceUrl}/api/v1/admin/merchants/${UPDATE_MERCHANT_NEGATIVE.negative.path.merchantId}`,
                {
                    method: 'put',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: UPDATE_MERCHANT_NEGATIVE.negative.body,
                },
            );
        });
    });
});
