export const ALL_TYPES_POSITIVE = {
    positive: {
        query: {
            isArchived: true,
            page: 0,
            size: 2,
            sort: ['name'],
        },
    },
};

export const TYPE_WITH_ID_POSITIVE = {
    positive: {
        path: {
            merchantId: 'mock_uuid',
        },
        query: {
            includeChildren: false,
        },
    },
};

export const GET_TYPE_CHILDREN_POSITIVE = {
    positive: {
        path: {
            merchantId: 'mock_uuid',
        },
        query: {
            page: 1,
            size: 2,
            sort: ['asc'],
        },
    },
};

export const CREATE_MERCHANT_POSITIVE = {
    positive: {
        body: {
            name: 'mock-type-name',
        },
    },
};

export const CREATE_MERCHANT_NEGATIVE = {
    negative: {
        body: {
            name: '',
        },
    },
};

export const UPDATE_MERCHANT_POSITIVE = {
    positive: {
        path: {
            merchantId: 'mock-uuid',
        },
        body: {
            name: 'mock-type-name',
        },
    },
};

export const UPDATE_MERCHANT_NEGATIVE = {
    negative: {
        path: {
            merchantId: '',
        },
        body: {
            name: 'mock-type-name',
        },
    },
};
