import * as log4js from 'log4js';

import { IControllerParams, TToken, IServiceParams } from '../../types';
import { Logger } from '../../configs/log4js.conf';
import { BaseController } from './base.controller';

interface IServiceMetaData extends IServiceParams {
    readonly modelsLocation?: string;
}

type TBaseControllerKey = Lowercase<string>;

export abstract class BaseService {
    public readonly logger: log4js.Logger;

    private readonly controllerParams: IControllerParams;

    protected constructor(params: IServiceMetaData, token?: TToken) {
        this.logger = Logger(this.constructor.name);

        this.controllerParams = {
            controllerUrl: params.serviceUrl,
            token,
            modelsLocation: params.modelsLocation,
        };
    }

    public abstract controller(params: TBaseControllerKey): BaseController;

    protected initController<T extends BaseController>(
        Controller: new (params: IControllerParams) => T,
        params: IControllerParams = this.controllerParams,
    ): T {
        return new Controller(params);
    }
}
