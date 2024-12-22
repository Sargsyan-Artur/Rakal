export const CATALOG_FIND_ALL_POSITIVE_SAMPLE_1 = {
    positive: {
        query: {
            limit: 20,
            page: 2,
        },
        path: {
            merchantId: 'some_dev_id',
        },
    },
};

export const CATALOG_FIND_ALL_NEGATIVE_SAMPLE_1 = {
    negative: {
        query: {
            limit: '20',
            page: false,
        },
        path: 123,
    },
};

export const CATALOG_FIND_ALL_DEF_NEGATIVE_SAMPLE_1 = {
    negative: {
        query: {
            limit: '20',
            page: false,
        },
    },
};

export const CATALOG_ADD_CAT_POSITIVE_SAMPLE_1 = {
    positive: {
        path: {
            merchantId: 'mid',
        },
        body: [
            {
                name: 'cat name',
                parent: 'cat parent',
                children: [
                    {
                        name: 'ch cat name',
                        parent: 'ch parent',
                    },
                ],
            },
        ],
    },
};

export const CATALOG_ADD_CAT_NEGATIVE_SAMPLE_1 = {
    negative: {
        path: 1,
        body: [
            {
                name: true,
            },
        ],
    },
};

export const CATALOG_REMOVE_CAT_POSITIVE_SAMPLE_1 = {
    positive: {
        path: {
            merchantId: 'mer_id',
            categoryId: 'cat_id',
        },
    },
};

export const CATALOG_REMOVE_CAT_NEGATIVE_SAMPLE_1 = {
    negative: {
        path: '/mid_id',
    },
};
