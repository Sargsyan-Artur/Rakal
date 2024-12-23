/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface IPaths {
    readonly '/api/v1/users': {
        readonly post: IOperations['create'];
    };
    readonly '/api/status/live': {
        readonly get: IOperations['live'];
    };
}

export interface components {
    readonly schemas: {
        readonly UserDto: {
            readonly username: string;
            readonly firstName: string;
            readonly lastName: string;
            readonly phone: string;
            readonly email: string;
            readonly merchantId?: string;
            readonly orgStructure?: readonly string[];
            readonly assignedRoles: readonly ('GS_ADMIN' | 'MERCHANT_SUPER_ADMIN' | 'MERCHANT_ADMIN' | 'SALES_REPRESENTATIVE')[];
        };
    };
}

export interface IOperations {
    readonly create: {
        readonly responses: {
            /** Created */
            readonly 201: unknown;
            /** Constraint violation */
            readonly 400: unknown;
            /** Access denied */
            readonly 403: unknown;
            /** User duplication by username or email */
            readonly 409: unknown;
        };
        readonly requestBody: {
            readonly content: {
                readonly 'application/json': components['schemas']['UserDto'];
            };
        };
    };
    readonly live: {
        readonly responses: {
            /** OK */
            readonly 200: {
                readonly content: {
                    readonly '*/*': string;
                };
            };
        };
    };
}

export interface external {}
