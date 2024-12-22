import {
    ICredentials,
    INegativeTest,
    IPositiveTest,
    TGetFatTokenByThinTokenParam,
    TGetThinTokenParam,
    TUpdateSessionByUserIdParam,
} from '../../../../../src/types';

export const CREDENTIALS_SAMPLE: ICredentials = {
    username: 'mock username',
    password: 'mock password',
};

export const GET_THIN_TOKEN_POSITIVE_FIXTURE: IPositiveTest<TGetThinTokenParam> = {
    positive: {
        body: { ...CREDENTIALS_SAMPLE },
    },
};

export const GET_THIN_TOKEN_NEGATIVE_FIXTURE: INegativeTest = {
    negative: {
        body: {},
    },
};

export const GET_FAT_TOKEN_POSITIVE_FIXTURE: IPositiveTest<TGetFatTokenByThinTokenParam> = {
    positive: {
        body: {
            sessionId: 'thin token from getThinToken',
        },
    },
};

export const GET_FAT_TOKEN_NEGATIVE_FIXTURE: INegativeTest = {
    negative: {
        body: {},
    },
};

export const UPDATE_SESSION_BY_USER_ID_POSITIVE_FIXTURE: IPositiveTest<TUpdateSessionByUserIdParam> = {
    positive: {
        body: {
            userId: 'userId from attributes in keycloak',
        },
    },
};

export const UPDATE_SESSION_BY_USER_ID_NEGATIVE_FIXTURE: INegativeTest = {
    negative: {
        body: {},
    },
};
