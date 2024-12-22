import { IApiConfGatewayParams, IApiConfServicesParams, IServicesParams } from '../../../../src/types';

export const TOKEN_SAMPLE = 'user-token';

export const SERVICES_PARAMS_SAMPLE: IApiConfServicesParams = {
    services: {
        product: {
            serviceUrl: 'http://localhost:0000/product',
        },
        merchant: {
            serviceUrl: 'http://localhost:0000/merchant',
        },
        auth: {
            serviceUrl: 'http://localhost:0000/auth-service',
        },
        user: {
            serviceUrl: 'http://localhost:0000/user',
        },
        job: {
            serviceUrl: 'http://localhost:0000/job',
        },
        commerceAdaptor: {
            serviceUrl: 'http://localhost:0000/commerceAdaptor',
        },
        catalog: {
            serviceUrl: 'http://localhost:0000/catalog',
        },
    },
};

export const WEB_GATEWAY_PARAMS_SAMPLE: IApiConfGatewayParams = {
    gateway: {
        type: 'web',
        gatewayUrl: 'http://localhost:0000/gateway',
    },
};

export const WEB_URLS_SAMPLE: IServicesParams = {
    product: {
        serviceUrl: `${WEB_GATEWAY_PARAMS_SAMPLE.gateway?.gatewayUrl}/product-service`,
    },
    merchant: {
        serviceUrl: `${WEB_GATEWAY_PARAMS_SAMPLE.gateway?.gatewayUrl}/merchant-hierarchy-service`,
    },
    auth: {
        serviceUrl: `${WEB_GATEWAY_PARAMS_SAMPLE.gateway?.gatewayUrl}/auth-service`,
    },
    user: {
        serviceUrl: `${WEB_GATEWAY_PARAMS_SAMPLE.gateway?.gatewayUrl}/user-service`,
    },
    job: {
        serviceUrl: `${WEB_GATEWAY_PARAMS_SAMPLE.gateway?.gatewayUrl}/job-service`,
    },
    commerceAdaptor: {
        serviceUrl: `${WEB_GATEWAY_PARAMS_SAMPLE.gateway?.gatewayUrl}/commerce-adapter`,
    },
    catalog: {
        serviceUrl: `${WEB_GATEWAY_PARAMS_SAMPLE.gateway?.gatewayUrl}/catalog-service`,
    },
};
