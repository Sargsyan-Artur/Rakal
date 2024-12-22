import got from 'got';

import { CategoriesAdapterController, CommerceAdapterService } from '../../../../../../../src/api/services';
import { SERVICES_PARAMS_SAMPLE } from '../../../../../fixtures/services/services.fixture';
import {
    CAT_ADAPT_NEGATIVE_SAMPLE_1,
    CAT_ADAPT_POSITIVE_SAMPLE_1,
    CAT_FOR_REMOVING_NEGATIVE_SAMPLE_1,
    CAT_FOR_REMOVING_POSITIVE_SAMPLE_1,
    NEW_CAT_ADAPT_NEGATIVE_SAMPLE_1,
    NEW_CAT_ADAPT_POSITIVE_SAMPLE_1,
} from '../../../../../fixtures/services/commerce-adapter/categories.adapter.fixtures';

jest.mock('log4js');
jest.mock('got');

describe('api > services > commerce-adapter > categories.adapter.controller', () => {
    let categoriesAdapterController: CategoriesAdapterController;

    beforeEach(() => {
        jest.clearAllMocks();

        const commerceAdapterService = new CommerceAdapterService(SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor!);
        categoriesAdapterController = commerceAdapterService.controller('categories');
    });

    describe('findCategories', () => {
        test('positive', async () => {
            expect.assertions(1);
            await categoriesAdapterController.findCategories(CAT_ADAPT_POSITIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor?.serviceUrl}/categories/${CAT_ADAPT_POSITIVE_SAMPLE_1.positive.path.merchantId}`,
                {
                    method: 'get',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    searchParams: CAT_ADAPT_POSITIVE_SAMPLE_1.positive.query,
                },
            );
        });

        test('negative', async () => {
            expect.assertions(1);
            await categoriesAdapterController.findCategories(CAT_ADAPT_NEGATIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor?.serviceUrl}/categories/${CAT_ADAPT_NEGATIVE_SAMPLE_1.negative.path}`,
                {
                    method: 'get',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    searchParams: CAT_ADAPT_NEGATIVE_SAMPLE_1.negative.query,
                },
            );
        });
    });

    describe('addCategories', () => {
        test('positive', async () => {
            expect.assertions(1);
            await categoriesAdapterController.addCategories(NEW_CAT_ADAPT_POSITIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor?.serviceUrl}/categories/${NEW_CAT_ADAPT_POSITIVE_SAMPLE_1.positive.path.merchantId}`,
                {
                    method: 'post',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: NEW_CAT_ADAPT_POSITIVE_SAMPLE_1.positive.body,
                },
            );
        });

        test('negative', async () => {
            expect.assertions(1);
            await categoriesAdapterController.addCategories(NEW_CAT_ADAPT_NEGATIVE_SAMPLE_1);

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor?.serviceUrl}/categories/${NEW_CAT_ADAPT_NEGATIVE_SAMPLE_1.negative.path}`,
                {
                    method: 'post',
                    responseType: 'json',
                    hooks: {
                        afterResponse: [expect.any(Function)],
                    },
                    json: NEW_CAT_ADAPT_NEGATIVE_SAMPLE_1.negative.body,
                },
            );
        });
    });

    describe('deleteCategory', () => {
        test('positive', async () => {
            expect.assertions(1);
            await categoriesAdapterController.deleteCategory(CAT_FOR_REMOVING_POSITIVE_SAMPLE_1);
            const { merchantId, categoryId } = CAT_FOR_REMOVING_POSITIVE_SAMPLE_1.positive.path;

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor?.serviceUrl}/categories/${merchantId}/${categoryId}`,
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
            await categoriesAdapterController.deleteCategory(CAT_FOR_REMOVING_NEGATIVE_SAMPLE_1);
            const { merchantId, categoryId } = CAT_FOR_REMOVING_NEGATIVE_SAMPLE_1.negative.path;

            expect(got).toHaveBeenCalledWith(
                `${SERVICES_PARAMS_SAMPLE.services?.commerceAdaptor?.serviceUrl}/categories/${merchantId}/${categoryId}`,
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
