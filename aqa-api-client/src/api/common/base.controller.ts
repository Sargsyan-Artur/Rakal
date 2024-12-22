import * as log4js from 'log4js';

import { Request } from '../../core/got';
import { IControllerParams, INegativeTest, IPositiveTest, TTestType } from '../../types';
import { Logger } from '../../configs/log4js.conf';

interface IControllerMetaData extends IControllerParams {
    readonly endpoint: string;
}

export abstract class BaseController {
    public readonly logger: log4js.Logger;

    protected readonly request: () => Request;

    protected constructor(params: IControllerMetaData) {
        this.logger = Logger(this.constructor.name);

        this.request = () => {
            const req = new Request(params.controllerUrl + params.endpoint, {
                responseType: 'json',
            }).modelsLocation(params.modelsLocation ?? '');

            if (params.token) {
                return req.headers({ Authorization: `Bearer ${params.token}` });
            }

            return req;
        };
    }

    protected isPositive<T>(params: TTestType<T>): params is IPositiveTest<T> {
        return 'positive' in params;
    }

    protected isNegative<T>(params: TTestType<T>): params is INegativeTest {
        return 'negative' in params;
    }
}
