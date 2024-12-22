import { Headers } from 'got';

import { IOperations } from '../../api/services/user/models/user.swagger.types';

export type TUsersControllerKey = 'users';
export type TUsersControllerKeys = TUsersControllerKey;

export type TUserServiceKey = 'user';

export type TCreateUserParam = {
    body: IOperations['create']['requestBody']['content']['application/json'];
    headerOptions?: {
        isNew?: boolean;
        headers: Headers;
    };
};

/**
 * Returned types of controllers
 */

export type TCreateUserResponse201 = IOperations['create']['responses']['201'];
