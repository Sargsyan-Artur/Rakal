export const ALL_BRANDS_POSITIVE_SAMPLE_1 = {
    positive: {
        query: {
            limit: 50,
            divisionId: 'unit-test',
            page: 20,
        },
    },
};

export const ALL_BRANDS_NEGATIVE_SAMPLE_1 = {
    negative: {
        query: {
            limit: '50',
            name: 122,
            page: 'fake-data',
        },
        body: {
            'test-body': 'mock-data',
        },
    },
};

export const CREATE_BRAND_POSITIVE_SAMPLE_1 = {
    positive: {
        body: {
            divisionId: 'mock-brand-name',
            name: 'mock-brand-name',
            position: 1,
        },
    },
};

export const CREATE_BRAND_NEGATIVE_SAMPLE_1 = {
    negative: {
        query: {
            limit: '50',
            name: 122,
            page: 'fake-data',
        },
        body: {
            name: 123,
            'test-body': 'mock-data',
            position: '1',
        },
    },
};

export const BRAND_WITH_ID_POSITIVE_SAMPLE_1 = {
    positive: {
        path: {
            id: 'test_uuid',
        },
    },
};

export const BRAND_NEGATIVE_SAMPLE_1 = {
    negative: {
        body: 'test body',
        path: {
            id: 'test_path',
        },
        query: {
            limit: '50',
            name: 122,
            page: 'fake-data',
        },
    },
};

export const UPD_BRAND_POSITIVE_SAMPLE_1 = {
    positive: {
        body: {
            name: 'new name',
            position: 2,
        },
        path: {
            id: 'test_id',
        },
    },
};

export const EXISTS_BRAND_SAMPLE_1 = {
    positive: {
        body: {
            divisionId: 'id',
            name: 'brand name',
        },
    },
};
