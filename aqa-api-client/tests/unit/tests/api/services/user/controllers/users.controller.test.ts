import got from 'got';

import { UsersController, UserService } from '../../../../../../../src/api/services';
import { SERVICES_PARAMS_SAMPLE } from '../../../../../fixtures/services/services.fixture';
import { CREATE_USER_NEGATIVE_SAMPLE, CREATE_USER_POSITIVE_SAMPLE } from '../../../../../fixtures/services/user/users.fixture';

jest.mock('log4js');
jest.mock('got');

describe('api > services > user > users.controller', () => {
    let usersController: UsersController;

    beforeEach(() => {
        jest.clearAllMocks();

        const userService = new UserService(SERVICES_PARAMS_SAMPLE.services?.user!);
        usersController = userService.controller('users');
    });

    describe('createUser', () => {
        test('positive', async () => {
            expect.assertions(1);

            await usersController.createUser(CREATE_USER_POSITIVE_SAMPLE);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.user?.serviceUrl}/api/v1/users`, {
                method: 'POST',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: CREATE_USER_POSITIVE_SAMPLE.positive.body,
                headers: {},
            });
        });

        test('negative', async () => {
            expect.assertions(1);

            await usersController.createUser(CREATE_USER_NEGATIVE_SAMPLE);

            expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.user?.serviceUrl}/api/v1/users`, {
                method: 'POST',
                responseType: 'json',
                hooks: {
                    afterResponse: [expect.any(Function)],
                },
                json: CREATE_USER_NEGATIVE_SAMPLE.negative.body,
                headers: {},
            });
        });
    });
});
