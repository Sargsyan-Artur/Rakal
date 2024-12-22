import got from 'got';

import { SERVICES_PARAMS_SAMPLE } from '../../../../../fixtures/services/services.fixture';
import {
    CREDENTIALS_SAMPLE,
    GET_FAT_TOKEN_NEGATIVE_FIXTURE,
    GET_FAT_TOKEN_POSITIVE_FIXTURE,
    GET_THIN_TOKEN_NEGATIVE_FIXTURE,
    GET_THIN_TOKEN_POSITIVE_FIXTURE,
    UPDATE_SESSION_BY_USER_ID_NEGATIVE_FIXTURE,
    UPDATE_SESSION_BY_USER_ID_POSITIVE_FIXTURE,
} from '../../../../../fixtures/services/auth/auth.fixture';
import { AuthService, AuthController } from '../../../../../../../src/api/services';

jest.mock('log4js');
jest.mock('got');

describe('api > services > auth > auth.controller', () => {
    let authController: AuthController;

    beforeEach(() => {
        jest.clearAllMocks();

        const authService = new AuthService(SERVICES_PARAMS_SAMPLE.services?.auth!);
        authController = authService.controller('auth');
    });

    test('getFatTokenByThinToken. Positive test', async () => {
        expect.assertions(1);

        await authController.getFatTokenByThinToken(GET_FAT_TOKEN_POSITIVE_FIXTURE);

        expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl}/api/v1/token/fat-token`, {
            method: 'POST',
            responseType: 'json',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            json: GET_FAT_TOKEN_POSITIVE_FIXTURE.positive.body,
        });
    });

    test('getFatTokenByThinToken. Negative test', async () => {
        expect.assertions(1);

        await authController.getFatTokenByThinToken(GET_FAT_TOKEN_NEGATIVE_FIXTURE);

        expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl}/api/v1/token/fat-token`, {
            method: 'POST',
            responseType: 'json',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            json: GET_FAT_TOKEN_NEGATIVE_FIXTURE.negative.body,
        });
    });

    test('getThinToken. Positive test', async () => {
        expect.assertions(1);

        await authController.getThinToken(GET_THIN_TOKEN_POSITIVE_FIXTURE);

        expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl}/api/v1/auth`, {
            method: 'POST',
            responseType: 'json',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            json: GET_THIN_TOKEN_POSITIVE_FIXTURE.positive.body,
        });
    });

    test('getThinToken. Negative test', async () => {
        expect.assertions(1);

        await authController.getThinToken(GET_THIN_TOKEN_NEGATIVE_FIXTURE);

        expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl}/api/v1/auth`, {
            method: 'POST',
            responseType: 'json',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            json: GET_THIN_TOKEN_NEGATIVE_FIXTURE.negative.body,
        });
    });

    test('updateSessionByUserId. Positive test', async () => {
        expect.assertions(1);

        await authController.updateSessionByUserId(UPDATE_SESSION_BY_USER_ID_POSITIVE_FIXTURE);

        expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl}/api/v1/session/updating`, {
            method: 'POST',
            responseType: 'json',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            json: UPDATE_SESSION_BY_USER_ID_POSITIVE_FIXTURE.positive.body,
        });
    });

    test('updateSessionByUserId. Negative test', async () => {
        expect.assertions(1);

        await authController.updateSessionByUserId(UPDATE_SESSION_BY_USER_ID_NEGATIVE_FIXTURE);

        expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl}/api/v1/session/updating`, {
            method: 'POST',
            responseType: 'json',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            json: UPDATE_SESSION_BY_USER_ID_NEGATIVE_FIXTURE.negative.body,
        });
    });

    test('getToken. Positive test', async () => {
        expect.assertions(2);

        await authController.getToken(CREDENTIALS_SAMPLE);

        expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl}/api/v1/auth`, {
            method: 'POST',
            responseType: 'json',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            json: CREDENTIALS_SAMPLE,
        });

        expect(got).toHaveBeenCalledWith(`${SERVICES_PARAMS_SAMPLE.services?.auth?.serviceUrl}/api/v1/token/fat-token`, {
            method: 'POST',
            responseType: 'json',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            json: { sessionId: undefined },
        });
    });
});
