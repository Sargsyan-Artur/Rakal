
Available API:

-   `ApiClient`
-   `Services` (all services, controllers and types)
-   `Gateway`
-   `HTTP_ERRORS`

## Get started:

1. Install the package: `npm i @rak-aqa/api-client`
    1. Recommended for use with the `@rak-aqa/utils` package.
2. How to use:

    1. Creating new tests:

    ```typescript
    // foo.test.ts
    import { ApiClient } from '@rak-aqa/api-client';

    const apiClient = new ApiClient({
        services: {
            servicename: {
                serviceUrl: envConf.services['servicename']!.url, // pls use '@rak-aqa/utils' npm package
            },
        },
    });

    describe('%servicename% Service [@%servicename%, @service]', () => {
        test('get data', async () => {
            const resp = await apiClient.services.service('servicename').controller('controllername').getAll(); // specific api for a service

            expect(resp.body.count).toBe(1);
        });
    });
    ```

    2. Possible cli params: `--logLevel`. Values: `'info', 'trace', 'debug', 'warn', 'error', 'all', 'fatal', 'off'`.
       Default: `info`;

## How to add a new service

1. Create a new service class:
    1. Extend it from 'BaseService' class.
    2. In the super function define a path to the swagger doc if it exists:

```typescript
// services/<serviceName>/index.ts
export class NameService extends BaseService {
    constructor(params: IServiceParams) {
        super({
            ...params,
            modelsLocation: '/servicename/models/<serviceName>.swagger.json',
        });
    }
}
```

2. Create a new abstract service base controller:
    1. Extend it from "BaseController" class:

```typescript
// services/<serviceName>/controllers/<serviceName>.base.controller.ts
export abstract class NameBaseController extends BaseController {}
```

3. Create a new service controller:
    1. Extend it from abstract service base controller (service base controller
       path: `services/<serviceName>/controllers/<serviceName>.base.controller.ts`).
    2. In the super function specify path to the endpoint.
    3. Declare controller methods:

```typescript
//services/<serviceName>/controllers/<controllerName>.controller.ts
export class NameController extends NameBaseController {
    constructor(params: IControllerParams) {
        super({
            ...params,
            endpoint: '/endpoint',
        });
    }

    // method example for a specific controller
    public allBrands(params: IPositiveTest<IOperations['findAllUsingGET']['parameters']>) {
        return this.request()
            .qs({ ...params.positive.query })
            .jsonSchemaJsonPath(PRODUCT_JSON_SCHEMA_PATHS.brands.all)
            .send<IOperations['findAllUsingGET']['responses']['200']['schema']>();
    }
}
```

4. Create types for a service and a controller parameters (`src/types/services/<serviceName>.ts`). Keys of controllers
   and service should be in lower case.

    1. Type for controller keys:

    ```typescript
    export type TNameControllerKey = 'controllerName';
    ```

    2. Type for service controller keys assign to the type for controller keys:

    ```typescript
    export type TServiceNameControllersKeys = TNameControllerKey; // (where ServiceName is e.g., Product)
    ```

    3. Type for service keys:

    ```typescript
    export type TNameServiceKey = 'serviceName';
    ```

4.1. Extend `TServicesKeys` by adding new service key (`src/types/services/index.ts`):

```typescript
export type TServicesKeys = TNameServiceKey | ...;
```

5. Initialize the service controller in the created service class:

```typescript
// services/<serviceName>/index.ts
public controller(controller: TNameControllerKey): NameController;
public controller(controller: TServiceNameControllersKeys): NameBaseController {
    switch (controller) {
        case 'controllerName':
            return this.initController(NameController);
    }
}
```

6. In 'IServicesParams' interface specify readonly optional property with a name of the service ('IServicesParams'
   interface path: `src/types/services/index.ts`)

```typescript
export interface IServicesParams {
    readonly serviceName?: IServiceParams;
}
```

7. In the 'Services' class
    1. Add overloading for the 'service' function
    2. Create cases for initialization of the created service

```typescript
// services/index.ts
public service(service: TNameServiceKey): NameService;
public service(service: TServicesKeys): BaseService {
    case 'serviceName':
       return this.initService(NameService, this.params.serviceName); // params is a property of "Services" class instance; serviceName is defined in "IServicesParams" interface
```

## How to add new json schema and docs

TODO

## How to add new test data using DDT approach

### In api-client/src/types/service/<servicename>.ts

-   Create a type alias for parameters of service controller:

```typescript
export type TCreateEntityParams = IOperations['createEntity']['parameters'];
```

### In the service where tests need to be created

-   Create a fixture with tests cases based on the created types (`tests/api/src/fixtures/entity.ts`):

```typescript
import { TTestCase, TCreateEntityParams } from '@rak-aqa/api-client';

// or TTestCases<TCreateEntityParams, 'positive'>[] Note: 'positive' is a default value.
export const CREATE_ENTITY_POSITIVE_CASES: TTestCase<TCreateEntityParams>[] = [
    {
        tcId: 1,
        tcDesc: 'create a new item only with valid required fields',
        request: {
            positive: {
                body: {
                    name: 'name',
                },
            },
        },
        response: {
            body: {
                $ref: '#/request/positive/body',
                count: 1,
            },
            statusCode: 200,
            '<custom prop>': 'some data',
        },
    },
];

export const CREATE_ENTITY_NEGATIVE_CASES: TTestCases<TCreateEntityParams, 'negative'>[] = [
    {
        tcId: 1,
        tcDesc: 'create a new item only with valid required fields',
        request: {
            negative: {
                body: {
                    name: 123,
                    position: 'some data',
                },
                query: {
                    a: 'qwe',
                },
            },
        },
        response: {
            body: {
                $ref: '#/request/negative/body',
                count: 1,
            },
            statusCode: 200,
            '<custom prop>': 'some data',
        },
    },
];
```

-   To dereference object properties, use `json-schema-ref-parser` npm package inside the `beforeAll` jest-hook.

### Test-case properties

> For more info, please check `TTestCase`, `TTestCaseBase`, `TExpectedResponse` types

-   **tcId**: number of test case (incremental index or mapping with the checklist ID)
-   **tcDesc**: Description of test scenario
-   **headers**: Response headers (Optional)
-   **request**: service request body weather with positive or negative test data input (contains body and query)
-   **response**: expected response data that need to be validated. Response can have the same data as in request body to
    be validated, so those data could be referenced from request body
