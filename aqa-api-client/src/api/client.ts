import * as log4js from 'log4js';

import { Services } from './services';
import { IApiConfGatewayParams, IApiConfServicesParams, ICredentials, IServicesParams, TToken } from '../types';
import { Logger } from '../configs/log4js.conf';
import { Gateway } from './gateway';

export class ApiClient {
    public readonly logger: log4js.Logger;
    public readonly services: Services;

    constructor(private readonly params: IApiConfGatewayParams | IApiConfServicesParams, token?: TToken) {
        this.logger = Logger(this.constructor.name);

        this.services = new Services(ApiClient.generateParams(this.params), token);
    }

    // https://confluence.greensky.net/display/rak/User+Provider
    // https://confluence.greensky.net/display/rak/%5Bdraft%5D+Auth+flow
    public async login(credentials: ICredentials): Promise<ApiClient> {
        let fatToken: TToken;
        try {
            fatToken = await this.services.service('auth').controller('auth').getToken(credentials);
        } catch (error) {
            throw new Error(`[login] Can't login with next username: ${JSON.stringify(credentials.username)}.\n${error}`);
        }
        return new ApiClient(
            {
                ...this.params,
            },
            fatToken,
        );
    }

    public setToken(token: TToken): ApiClient {
        return new ApiClient({ ...this.params }, token);
    }

    private static generateParams(params: IApiConfGatewayParams | IApiConfServicesParams): IServicesParams {
        if (params.gateway) {
            const gateway = new Gateway(params.gateway);
            return gateway.urls();
        }

        return params.services ?? {};
    }
}

const product  = new ApiClient({}).services.service("product").controller("brand").getBrandById({ path: {id: "asd"} })

a.controller("brand")
a.controller("brand")
