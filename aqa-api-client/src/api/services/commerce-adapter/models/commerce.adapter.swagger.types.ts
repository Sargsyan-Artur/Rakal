/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface IPaths {
    readonly '/categories/{merchantId}': {
        readonly get: IOperations['findCategories'];
        readonly post: IOperations['addCategories'];
    };
    readonly '/categories/{merchantId}/{categoryId}': {
        readonly delete: IOperations['deleteCategory'];
    };
}

export interface components {
    readonly schemas: {
        /** Represents Category Request DTO. */
        readonly CategoryRequestDTO: {
            readonly parentId?: string;
            readonly name: string;
            readonly children?: readonly components['schemas']['CategoryRequestDTO'][];
            readonly version?: number;
        };
        readonly ErrorResponse: {
            readonly timestamp?: string;
            readonly status?: number;
            readonly title?: string;
            readonly errors?: { readonly [key: string]: string };
            readonly detail?: string;
            readonly path?: string;
        };
        /** Represents Category Response DTO. */
        readonly CategoryResponseDTO: {
            readonly id?: string;
            readonly parentId?: string;
            readonly name?: string;
            readonly merchantId?: string;
            readonly level?: number;
            readonly version?: number;
            readonly order?: string;
            readonly divisions?: readonly string[];
            readonly children?: readonly components['schemas']['CategoryResponseDTO'][];
        };
        readonly CategoryResponsePagedDTO: {
            /** The offset supplied by the client or the server default. It is the number of elements skipped, not a page number. */
            readonly offset?: number;
            /** Shows how many items the current page can contains. */
            readonly limit?: number;
            /** The actual number of results returned in results. */
            readonly count?: number;
            /** The total number of results matching the query. */
            readonly total?: number;
            /** List of results */
            readonly results?: readonly components['schemas']['CategoryResponseDTO'][];
            /** Generated link to the previous page. If the current page is the first - contains 'null' */
            readonly prevPage?: string | null;
            /** Generated link to the next page. If the current page is the last one - contains 'null' */
            readonly nextPage?: string | null;
        };
    };
}

export interface IOperations {
    readonly findCategories: {
        readonly parameters: {
            // fixed manually
            readonly query?: {
                /** The offset into the results matching the query can be set using the offset query parameter. The default value is 0, indicating that no results should be skipped. */
                readonly offset?: number;
                /** The maximum number of results to return from a query. Allowed is a value between 1 and 200. The default limit is 20 */
                readonly limit?: number;
                /** Allows to set sort field for categories that belong to the specified merchant */
                readonly sortBy?: 'name';
                /** Allows to set sort order for categories that belong to the specified merchant */
                readonly sortOrder?: 'asc' | 'desc';
            };
            readonly path: {
                /** Allows to filter categories that belong to the specified merchant */
                readonly merchantId: string;
            };
        };
        readonly responses: {
            /** Successfully found. */
            readonly 200: {
                readonly content: {
                    readonly 'application/json': components['schemas']['CategoryResponsePagedDTO'];
                };
            };
            /** Incorrect values were specified or not all required fields were set. */
            readonly 400: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
            /** User is not authenticated */
            readonly 401: unknown;
            /** User doesn't have enough permissions */
            readonly 403: unknown;
            /** Requested resource is not found */
            readonly 404: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
            /** Internal error occurred */
            readonly 500: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
        };
    };
    readonly addCategories: {
        readonly parameters: {
            readonly path: {
                /** Merchant identifier. */
                readonly merchantId: string;
            };
        };
        readonly responses: {
            /** Indicates that resource was successfully created */
            readonly 200: {
                readonly content: {
                    readonly 'application/json': readonly components['schemas']['CategoryResponseDTO'][];
                };
            };
            /** Incorrect values were specified or not all required fields were set */
            readonly 400: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
            /** User is not authenticated */
            readonly 401: unknown;
            /** User doesn't have enough permissions */
            readonly 403: unknown;
            /** Requested resource is not found. */
            readonly 404: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
            /** Internal error occurred */
            readonly 500: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
        };
        readonly requestBody: {
            readonly content: {
                readonly 'application/json': readonly components['schemas']['CategoryRequestDTO'][];
            };
        };
    };
    readonly deleteCategory: {
        readonly parameters: {
            readonly path: {
                /** Merchant identifier. */
                readonly merchantId: string;
                /** Category identifier. */
                readonly categoryId: string;
            };
        };
        readonly responses: {
            /** Indicates that existing resource was successfully deleted */
            readonly 200: {
                readonly content: {
                    readonly 'application/json': string;
                };
            };
            /** Incorrect values were specified or not all required fields were set */
            readonly 400: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
            /** User is not authenticated */
            readonly 401: unknown;
            /** User doesn't have enough permissions */
            readonly 403: unknown;
            /** Requested resource is not found. */
            readonly 404: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
            /** Internal error occurred */
            readonly 500: {
                readonly content: {
                    readonly 'application/json': components['schemas']['ErrorResponse'];
                };
            };
        };
    };
}

export interface external {}
