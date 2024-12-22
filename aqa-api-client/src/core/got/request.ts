import type { Headers, Hooks, Method, Options, OptionsOfJSONResponseBody, OptionsOfTextResponseBody } from 'got';
import got from 'got';
import * as log4js from 'log4js';
import { CookieJar } from 'tough-cookie';

import { Response } from './response';
import { allureResponse } from '../allure/response.attachment';
import { Logger } from '../../configs/log4js.conf';
import { IJsonSchemaData } from '../../types';

export class Request {
    public readonly logger: log4js.Logger;

    private readonly jsonSchemaData: IJsonSchemaData = {
        location: '',
        path: [],
    };

    constructor(private _url: string, private _options: Options = {}) {
        this.logger = Logger(this.constructor.name);

        this.hooks({
            afterResponse: [
                async response => {
                    await allureResponse(response, this.jsonSchemaData);
                    return response;
                },
            ],
        });
    }

    /**
     * Doc: https://github.com/sindresorhus/got/blob/main/documentation/2-options.md
     */
    public options(options: OptionsOfTextResponseBody | OptionsOfJSONResponseBody, isNew?: boolean): this {
        this._options = isNew ? options : { ...this._options, ...options };
        return this;
    }

    public method(name: Method): this {
        this._options.method = name;
        return this;
    }

    public headers(headers: Headers, isNew?: boolean): this {
        this._options.headers = isNew ? headers : { ...this._options.headers, ...headers };
        return this;
    }

    /**
     * Doc: https://github.com/sindresorhus/got/blob/main/documentation/9-hooks.md
     */
    public hooks(hooks: Hooks, isNew?: boolean): this {
        this._options.hooks = isNew ? hooks : { ...this._options.hooks, ...hooks };
        return this;
    }

    public url(url: string, isNew?: boolean): this {
        this._url = isNew ? url : this._url + url;
        return this;
    }

    public qs(qs: Options['searchParams']): this {
        this._options.searchParams = qs;
        return this;
    }

    public body(body: object): this {
        this._options.json = body;
        return this;
    }

    public form(form: Record<string, string>): this {
        this._options.form = form;
        return this;
    }

    public cookieJar(cookie: string): this {
        const cookieJar = new CookieJar();
        cookieJar.setCookieSync(cookie, this._url);
        this._options.cookieJar = cookieJar;
        return this;
    }

    public modelsLocation(location: string): this {
        this.jsonSchemaData.location = location;
        return this;
    }

    public jsonSchemaJsonPath(path: string[]): this {
        this.jsonSchemaData.path = path;
        return this;
    }

    public async send<IBody = unknown>(): Promise<Response<IBody>> {
        this.logger.info(this._url);
        this.logger.debug(JSON.stringify(this._options, null, 2));

        const result = await got(this._url, this._options);
        return new Response<IBody>(result, this.jsonSchemaData);
    }
}
