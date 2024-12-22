import { INegativeTest, IPositiveTest, TCreateUserParam } from '../../../../../src/types';

export const CREATE_USER_POSITIVE_SAMPLE: IPositiveTest<TCreateUserParam> = {
    positive: {
        body: {
            username: 'mock-create-user-username',
            firstName: 'mock-create-user-first-name',
            lastName: 'mock-create-user-last-name',
            email: 'mock-email@greensky.com',
            phone: '1234567891',
            assignedRoles: ['GS_ADMIN'],
        },
    },
};

export const CREATE_USER_NEGATIVE_SAMPLE: INegativeTest = {
    negative: {
        body: {},
    },
};
