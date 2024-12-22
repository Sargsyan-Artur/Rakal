import { IOperations } from '../../api/services/auth/models/auth.swagger.types';

export type TAuthControllerKey = 'auth';
export type TAuthControllersKeys = TAuthControllerKey;

export type TAuthServiceKey = 'auth';

export type TGetFatTokenByThinTokenParam = {
    body: IOperations['getFatToken']['requestBody']['content']['application/json'];
};

export type TGetThinTokenParam = {
    body: IOperations['auth']['requestBody']['content']['application/json'];
};

export type TUpdateSessionByUserIdParam = {
    body: IOperations['refreshUserSessionsById']['requestBody']['content']['application/json'];
};

/**
 * Returned types of controllers
 */

export type TGetThinToken200Resp = IOperations['auth']['responses']['200']['content']['*/*'];

export type TGetFatTokenByThinToken200Resp = IOperations['getFatToken']['responses']['200']['content']['*/*'];

export type TUpdateSessionByUserId200Resp = IOperations['refreshUserSessionsById']['responses']['200'];
