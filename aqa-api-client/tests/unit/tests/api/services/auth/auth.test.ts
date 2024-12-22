import path from 'path';

import { SERVICES_PARAMS_SAMPLE } from '../../../../fixtures/services/services.fixture';
import { AuthController, AuthService } from '../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('../../../../../../src/api/services/auth/controllers/auth.controller.ts');

const AuthControllerMock = AuthController as jest.MockedClass<typeof AuthController>;

describe('api > services > auth', () => {
    test('factory', () => {
        expect.assertions(3);

        const authService = new AuthService(SERVICES_PARAMS_SAMPLE.services?.auth!);

        expect(authService.controller('auth')).toBeInstanceOf(AuthController);

        expect(AuthControllerMock.mock.calls[0]![0].modelsLocation).toContain(
            path.resolve('src/api/services/auth/models/auth.swagger.json'),
        );

        expect(AuthController).toHaveBeenNthCalledWith(1, {
            controllerUrl: SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl,
            modelsLocation: AuthControllerMock.mock.calls[0]![0].modelsLocation,
        });
    });
});
