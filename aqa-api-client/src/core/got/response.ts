import type { Headers, Method } from 'got';
import * as log4js from 'log4js';

import { ResponseAsserts } from '../../asserts/response.asserts';
import { Logger } from '../../configs/log4js.conf';
import { IJsonSchemaData } from '../../types';

export class Response<IBody> {
    public readonly logger: log4js.Logger;
    public asserts: ResponseAsserts<IBody>;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(private readonly response: any, jsonSchemaData: IJsonSchemaData) {
        this.logger = Logger(this.constructor.name);
        this.asserts = new ResponseAsserts<IBody>(this, jsonSchemaData);
    }

    public get body(): IBody {
        return this.response.body as IBody;
    }

    public get httpVersion(): string {
        return this.response.httpVersion;
    }

    public get headers(): Headers {
        return this.response.headers;
    }

    public get url(): string {
        return this.response.url;
    }

    public get method(): Method {
        return this.response.method;
    }

    public get status(): { statusCode: number[]; statusMessage: string } {
        return {
            statusCode: this.response.statusCode,
            statusMessage: this.response.statusMessage,
        };
    }

    public get requestUrl(): string {
        return this.response.requestUrl;
    }

    public get ip(): string {
        return this.response.ip;
    }
}
