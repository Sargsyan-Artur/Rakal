import {
    IPositiveTest,
    TAddCategoriesAdapterParam,
    TDeleteCategoryAdapterParam,
    TFindCategoriesAdapterParam,
} from '../../../../../src/types';

export const CAT_ADAPT_POSITIVE_SAMPLE_1: IPositiveTest<TFindCategoriesAdapterParam> = {
    positive: {
        query: {
            limit: 5,
            offset: 0,
            sortBy: 'name',
            sortOrder: 'asc',
        },
        path: {
            merchantId: 'merchant_id',
        },
    },
};

export const CAT_ADAPT_NEGATIVE_SAMPLE_1 = {
    negative: {
        query: {
            mid: 1,
            limit: 5,
            offset: 0,
        },
        path: 'merchant_id',
    },
};

export const NEW_CAT_ADAPT_POSITIVE_SAMPLE_1: IPositiveTest<TAddCategoriesAdapterParam> = {
    positive: {
        path: {
            merchantId: 'merchant_id',
        },
        body: [
            {
                parentId: '1',
                name: 'category name 2',
                version: 1,
                children: [
                    {
                        parentId: '1',
                        name: 'category name 1',
                        version: 1,
                    },
                ],
            },
        ],
    },
};

export const NEW_CAT_ADAPT_NEGATIVE_SAMPLE_1 = {
    negative: {
        path: 'merchant_id',
        body: [
            {
                parentId: 1,
                name: 'category name 2',
                version: '1',
                children: [
                    {
                        parentId: true,
                        name: 'category name 1',
                        version: null,
                    },
                ],
            },
        ],
    },
};

export const CAT_FOR_REMOVING_POSITIVE_SAMPLE_1: IPositiveTest<TDeleteCategoryAdapterParam> = {
    positive: {
        path: {
            merchantId: 'merchant_id',
            categoryId: 'cat_id',
        },
    },
};

export const CAT_FOR_REMOVING_NEGATIVE_SAMPLE_1 = {
    negative: {
        path: {
            merchantId: 1,
            categoryId: 2,
        },
    },
};
