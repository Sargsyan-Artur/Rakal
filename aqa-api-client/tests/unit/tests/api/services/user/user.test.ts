import * as path from 'path';

import { SERVICES_PARAMS_SAMPLE } from '../../../../fixtures/services/services.fixture';
import { UsersController, UserService } from '../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('../../../../../../src/api/services/user/controllers/users.controller');

const UserControllerMock = UsersController as jest.MockedClass<typeof UsersController>;

describe('api > services > user', () => {
    test('factory', () => {
        expect.assertions(3);
        const userService = new UserService(SERVICES_PARAMS_SAMPLE.services?.user!);

        expect(userService.controller('users')).toBeInstanceOf(UsersController);

        expect(UserControllerMock.mock.calls[0]![0].modelsLocation).toContain(
            path.resolve('src/api/services/user/models/user.swagger.json'),
        );

        expect(UserControllerMock).toHaveBeenNthCalledWith(1, {
            controllerUrl: SERVICES_PARAMS_SAMPLE.services?.user?.serviceUrl,
            modelsLocation: UserControllerMock.mock.calls[0]![0].modelsLocation,
        });
    });
});
