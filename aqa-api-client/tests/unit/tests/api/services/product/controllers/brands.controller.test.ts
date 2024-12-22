import got from 'got';

import { BrandsController, ProductService } from '../../../../../../../src/api/services';
import { SERVICES_PARAMS_SAMPLE } from '../../../../../fixtures/services/services.fixture';
import {
    ALL_BRANDS_NEGATIVE_SAMPLE_1,
    ALL_BRANDS_POSITIVE_SAMPLE_1,
    BRAND_NEGATIVE_SAMPLE_1,
    BRAND_WITH_ID_POSITIVE_SAMPLE_1,
    CREATE_BRAND_NEGATIVE_SAMPLE_1,
    CREATE_BRAND_POSITIVE_SAMPLE_1,
    EXISTS_BRAND_SAMPLE_1,
    UPD_BRAND_POSITIVE_SAMPLE_1,
} from '../../../../../fixtures/services/product/brands.fixture';

jest.mock('log4js');
jest.mock('got');

describe('api > services > product > brands.controller', () => {
    let brandsController: BrandsController;

    beforeEach(() => {
        jest.clearAllMocks();

        const productService = new ProductService(SERVICES_PARAMS_SAMPLE.services?.product!);
        brandsController = productService.controller('brand');
    });

    describe('findAll', () => {
        test('positive', async () => {
            expect.assertions(1);

            await brandsController.findAll(ALL_BRANDS_POSITIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands`, {
                method: 'get',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                searchParams: ALL_BRANDS_POSITIVE_SAMPLE_1.positive.query,
            });
        });

        test('negative', async () => {
            expect.assertions(1);

            await brandsController.findAll(ALL_BRANDS_NEGATIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands`, {
                method: 'get',
                responseType: 'json',
                searchParams: ALL_BRANDS_NEGATIVE_SAMPLE_1.negative.query,
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: ALL_BRANDS_NEGATIVE_SAMPLE_1.negative.body,
            });
        });
    });

    describe('createBrand', () => {
        test('positive', async () => {
            expect.assertions(1);

            await brandsController.createBrand(CREATE_BRAND_POSITIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands`, {
                method: 'post',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: CREATE_BRAND_POSITIVE_SAMPLE_1.positive.body,
            });
        });

        test('negative', async () => {
            expect.assertions(1);

            await brandsController.createBrand(CREATE_BRAND_NEGATIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands`, {
                method: 'post',
                responseType: 'json',
                searchParams: CREATE_BRAND_NEGATIVE_SAMPLE_1.negative.query,
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: CREATE_BRAND_NEGATIVE_SAMPLE_1.negative.body,
            });
        });
    });

    describe('deleteBrand', () => {
        test('positive', async () => {
            expect.assertions(1);

            await brandsController.deleteBrand(BRAND_WITH_ID_POSITIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/${BRAND_WITH_ID_POSITIVE_SAMPLE_1.positive.path.id}`,
                {
                    method: 'delete',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                },
            );
        });

        test('negative', async () => {
            expect.assertions(1);

            await brandsController.deleteBrand(BRAND_NEGATIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/${BRAND_NEGATIVE_SAMPLE_1.negative.path.id}`,
                {
                    method: 'delete',
                    searchParams: BRAND_NEGATIVE_SAMPLE_1.negative.query,
                    json: BRAND_NEGATIVE_SAMPLE_1.negative.body,
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    responseType: 'json',
                },
            );
        });
    });

    describe('getBrandById', () => {
        test('positive', async () => {
            expect.assertions(1);

            await brandsController.getBrandById(BRAND_WITH_ID_POSITIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/${BRAND_WITH_ID_POSITIVE_SAMPLE_1.positive.path.id}`,
                {
                    method: 'get',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                },
            );
        });

        test('negative', async () => {
            expect.assertions(1);

            await brandsController.getBrandById(BRAND_NEGATIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/${BRAND_NEGATIVE_SAMPLE_1.negative.path.id}`,
                {
                    method: 'get',
                    searchParams: BRAND_NEGATIVE_SAMPLE_1.negative.query,
                    json: BRAND_NEGATIVE_SAMPLE_1.negative.body,
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    responseType: 'json',
                },
            );
        });
    });

    describe('updateBrand', () => {
        test('positive', async () => {
            expect.assertions(1);

            await brandsController.updateBrand(UPD_BRAND_POSITIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/${UPD_BRAND_POSITIVE_SAMPLE_1.positive.path.id}`,
                {
                    method: 'put',
                    responseType: 'json',
                    json: UPD_BRAND_POSITIVE_SAMPLE_1.positive.body,
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                },
            );
        });

        test('negative', async () => {
            expect.assertions(1);

            await brandsController.updateBrand(BRAND_NEGATIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/${BRAND_NEGATIVE_SAMPLE_1.negative.path.id}`,
                {
                    method: 'put',
                    searchParams: BRAND_NEGATIVE_SAMPLE_1.negative.query,
                    json: BRAND_NEGATIVE_SAMPLE_1.negative.body,
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    responseType: 'json',
                },
            );
        });
    });

    describe('patchBrand', () => {
        test('positive', async () => {
            expect.assertions(1);

            await brandsController.patchBrand(UPD_BRAND_POSITIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/${UPD_BRAND_POSITIVE_SAMPLE_1.positive.path.id}`,
                {
                    method: 'patch',
                    responseType: 'json',
                    json: UPD_BRAND_POSITIVE_SAMPLE_1.positive.body,
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                },
            );
        });

        test('negative', async () => {
            expect.assertions(1);

            await brandsController.patchBrand(BRAND_NEGATIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/${BRAND_NEGATIVE_SAMPLE_1.negative.path.id}`,
                {
                    method: 'patch',
                    searchParams: BRAND_NEGATIVE_SAMPLE_1.negative.query,
                    json: BRAND_NEGATIVE_SAMPLE_1.negative.body,
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    responseType: 'json',
                },
            );
        });
    });

    describe('existsBrand', () => {
        test('positive', async () => {
            expect.assertions(1);

            await brandsController.existsBrand(EXISTS_BRAND_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/exists`, {
                method: 'post',
                responseType: 'json',
                json: EXISTS_BRAND_SAMPLE_1.positive.body,
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
            });
        });

        test('negative', async () => {
            expect.assertions(1);

            await brandsController.existsBrand(BRAND_NEGATIVE_SAMPLE_1);
            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.product?.serviceUrl}/brands/exists`, {
                method: 'post',
                json: BRAND_NEGATIVE_SAMPLE_1.negative.body,
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                responseType: 'json',
            });
        });
    });
});
