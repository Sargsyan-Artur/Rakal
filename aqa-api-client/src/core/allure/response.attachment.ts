import { inspect } from 'util';
import { ContentType, Status } from 'allure-js-commons';
import $RefParser from '@apidevtools/json-schema-ref-parser';

import { extractJsonSchema } from '../docs/utils';
import { IJsonSchemaData } from '../../types';

import('jest-allure2-adapter');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function allureResponse(response: any, jsonSchemaData: IJsonSchemaData): Promise<void> {
    // @ts-ignore
    if (!global.reporter) {
        return;
    }
    console.log("asssssssssssssssssssssssssssssssssssssssssss")

    // @ts-ignore
    if (!reporter.runningTest) {
        return;
    }

    const url = new URL(response.url);

    const respMeta = {
        ip: response.ip,
        httpVersion: response.httpVersion,
        timings: response.timings,
        url: response.url,
        redirectUrls: response.redirectUrls,
        aborted: response.aborted,
        statusCode: response.statusCode,
    };

    const reqMeta = {
        method: response.request.options.method || 'GET',
        statusCode: response.statusCode,
        requestUrl: response.requestUrl || response.request.requestUrl,
    };

    const stepName = `${reqMeta.method} | ${reqMeta.statusCode} | ${url.pathname}`;

    reporter.startStep(stepName);

    reporter.attachment('Request metadata', JSON.stringify(reqMeta, null, 2), ContentType.JSON);
    reporter.attachment('Request headers', JSON.stringify(response.request.options.headers, null, 2), ContentType.JSON);

    if (response.request.options.json) {
        reporter.attachment('Request body', JSON.stringify(response.request.options.json, null, 2), ContentType.JSON);
    }

    reporter.attachment('Response metadata', JSON.stringify(respMeta, null, 2), ContentType.JSON);
    reporter.attachment('Response headers', JSON.stringify(response.headers, null, 2), ContentType.JSON);

    if (response.body) {
        reporter.attachment('Response body', JSON.stringify(response.body, null, 2), ContentType.JSON);
    }

    if (jsonSchemaData.path.length > 0) {
        // eslint-disable-next-line import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires
        const referencedSwagger = await new $RefParser().dereference(require(jsonSchemaData.location));

        const schema = extractJsonSchema(referencedSwagger, jsonSchemaData.path);
        // inspect - because of circle dependencies
        reporter.attachment('JSON Schema', inspect(schema, undefined, 4), ContentType.JSON);
    }

    return reporter.endStep(Status.PASSED);
}
