import { IServicesParams } from '../services';

export * from './test.types';

export type TToken = string;

export interface IGatewayParams {
    readonly type: 'web'; // | 'mobile'
    readonly gatewayUrl: string;
}

export interface IApiConfServicesParams {
    readonly services?: IServicesParams;
    readonly gateway?: never;
}

export interface IApiConfGatewayParams {
    readonly gateway?: IGatewayParams;
    readonly services?: never;
}

export interface IControllerParams {
    readonly controllerUrl: string;
    readonly token?: TToken;
    readonly modelsLocation?: string;
}

export interface IJsonSchemaData {
    location: string;
    path: string[];
}

export interface ICredentials {
    readonly username: string;
    readonly password: string;
}
