import got from 'got';

import { SERVICES_PARAMS_SAMPLE } from '../../../../../fixtures/services/services.fixture';
import {
    CATALOG_ADD_CAT_NEGATIVE_SAMPLE_1,
    CATALOG_ADD_CAT_POSITIVE_SAMPLE_1,
    CATALOG_FIND_ALL_DEF_NEGATIVE_SAMPLE_1,
    CATALOG_FIND_ALL_NEGATIVE_SAMPLE_1,
    CATALOG_FIND_ALL_POSITIVE_SAMPLE_1,
    CATALOG_REMOVE_CAT_NEGATIVE_SAMPLE_1,
    CATALOG_REMOVE_CAT_POSITIVE_SAMPLE_1,
} from '../../../../../fixtures/services/catalog/catalog.fixtures';
import { CatalogsController, CatalogService } from '../../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('got');

describe('api > services > catalog > catalogs.controller', () => {
    let catalogsController: CatalogsController;

    beforeEach(() => {
        jest.clearAllMocks();

        const catalogService = new CatalogService(SERVICES_PARAMS_SAMPLE.services?.catalog!);
        catalogsController = catalogService.controller('catalogs');
    });

    describe('findAll', () => {
        test('positive', async () => {
            expect.assertions(1);
            await catalogsController.findAll(CATALOG_FIND_ALL_POSITIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl}/catalogs/${CATALOG_FIND_ALL_POSITIVE_SAMPLE_1.positive.path.merchantId}`,
                {
                    method: 'get',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    searchParams: CATALOG_FIND_ALL_POSITIVE_SAMPLE_1.positive.query,
                },
            );
        });

        test('negative', async () => {
            expect.assertions(1);
            await catalogsController.findAll(CATALOG_FIND_ALL_NEGATIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl}/catalogs/${CATALOG_FIND_ALL_NEGATIVE_SAMPLE_1.negative.path}`,
                {
                    method: 'get',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    searchParams: CATALOG_FIND_ALL_NEGATIVE_SAMPLE_1.negative.query,
                },
            );
        });
    });

    describe('findAllDefault', () => {
        test('positive', async () => {
            expect.assertions(1);
            await catalogsController.findAllDefault();

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl}/catalogs/default`, {
                method: 'get',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
            });
        });

        test('negative', async () => {
            expect.assertions(1);
            await catalogsController.findAllDefault(CATALOG_FIND_ALL_DEF_NEGATIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl}/catalogs/default`, {
                method: 'get',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                searchParams: CATALOG_FIND_ALL_DEF_NEGATIVE_SAMPLE_1.negative.query,
            });
        });
    });

    describe('addCategories', () => {
        test('positive', async () => {
            expect.assertions(1);
            await catalogsController.addCategories(CATALOG_ADD_CAT_POSITIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl}/catalogs/${CATALOG_ADD_CAT_POSITIVE_SAMPLE_1.positive.path.merchantId}`,
                {
                    method: 'post',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: CATALOG_ADD_CAT_POSITIVE_SAMPLE_1.positive.body,
                },
            );
        });

        test('negative', async () => {
            expect.assertions(1);
            await catalogsController.addCategories(CATALOG_ADD_CAT_NEGATIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl}/catalogs/${CATALOG_ADD_CAT_NEGATIVE_SAMPLE_1.negative.path}`,
                {
                    method: 'post',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: CATALOG_ADD_CAT_NEGATIVE_SAMPLE_1.negative.body,
                },
            );
        });
    });

    describe('removeCategory', () => {
        test('positive', async () => {
            expect.assertions(1);
            await catalogsController.removeCategory(CATALOG_REMOVE_CAT_POSITIVE_SAMPLE_1);
            const url = `${SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl}/catalogs/${CATALOG_REMOVE_CAT_POSITIVE_SAMPLE_1.positive.path.merchantId}/category/${CATALOG_REMOVE_CAT_POSITIVE_SAMPLE_1.positive.path.categoryId}`;

            expect(got).toHaveBeenCalledWith(url, {
                method: 'delete',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
            });
        });

        test('negative', async () => {
            expect.assertions(1);
            await catalogsController.removeCategory(CATALOG_REMOVE_CAT_NEGATIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.catalog?.serviceUrl}/catalogs${CATALOG_REMOVE_CAT_NEGATIVE_SAMPLE_1.negative.path}`,
                {
                    method: 'delete',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                },
            );
        });
    });
});
