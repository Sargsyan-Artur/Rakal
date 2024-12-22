export const ALL_TYPES_POSITIVE = {
    positive: {
        query: {
            page: 0,
            size: 2,
            sort: ['name'],
            mid: 'mock-uuid',
        },
    },
};

export const CREATE_TYPE_POSITIVE = {
    positive: {
        body: {
            merchantId: 'mock-type-id',
            name: 'mock-type-name',
        },
    },
};

export const TYPE_WITH_ID_POSITIVE = {
    positive: {
        path: {
            typeId: 'mock_uuid',
        },
        body: {
            name: 'mock-name',
        },
    },
};

export const DELETE_TYPE_WITH_ID_POSITIVE = {
    positive: {
        path: {
            id: 'mock_uuid',
        },
    },
};

export const UPDATE_SUBTYPE_WITH_ID_POSITIVE = {
    positive: {
        body: {
            id: 'mock-uuid',
            name: 'mock-name',
        },
    },
};

export const DELETE_SUBTYPE_WITH_ID_POSITIVE = {
    positive: {
        path: {
            subTypeId: 'mock_uuid',
        },
    },
};
