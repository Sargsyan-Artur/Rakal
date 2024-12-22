import { IGatewayParams, IServicesParams } from '../../types';

export class Gateway {
    constructor(private readonly params?: IGatewayParams) {}

    public urls(): IServicesParams {
        if (!this.params) {
            throw new Error('Please specify configuration params for gateway');
        }

        switch (this.params.type) {
            case 'web':
                return Gateway.web(this.params.gatewayUrl);
            default:
                throw new Error(`Available 'web' gateway only. Current: '${this.params.type}'`);
        }
    }

    private static web(url: string): IServicesParams {
        return {
            product: {
                serviceUrl: `${url}/product-service`,
            },
            merchant: {
                serviceUrl: `${url}/merchant-hierarchy-service`,
            },
            auth: {
                serviceUrl: `${url}/auth-service`,
            },
            user: {
                serviceUrl: `${url}/user-service`,
            },
            job: {
                serviceUrl: `${url}/job-service`,
            },
            commerceAdaptor: {
                serviceUrl: `${url}/commerce-adapter`,
            },
            catalog: {
                serviceUrl: `${url}/catalog-service`,
            },
        };
    }
}
