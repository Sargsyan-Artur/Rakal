import got from 'got';

import { Request, Response } from '../../../../../src/core/got';

jest.mock('got');
jest.mock('log4js');
jest.mock('../../../../../src/core/got/response.ts');

describe('core > got > Request', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('without options', async () => {
        expect.assertions(1);

        await new Request('http://localhost:0000')
            .method('get')
            .headers({
                testheaders: 'unit-test',
            })
            .qs({
                testqs: 1,
            })
            .url('/test')
            .body({
                testbody: 'test-body',
            })
            .form({
                name: 'form name',
            })
            .jsonSchemaJsonPath(['json', 'path'])
            .options({
                agent: false,
            })
            .modelsLocation('models/path')
            .send();

        expect(got).toHaveBeenCalledWith('http://localhost:0000/test', {
            agent: false,
            headers: {
                testheaders: 'unit-test',
            },
            json: {
                testbody: 'test-body',
            },
            form: {
                name: 'form name',
            },
            method: 'get',
            hooks: {
                afterResponse: [expect.any(Function)],
            },
            searchParams: {
                testqs: 1,
            },
        });
    });

    test('with options', async () => {
        expect.assertions(1);

        new Request('http://localhost:0000').hooks({
            init: [() => ''],
        });

        await new Request('http://localhost:0000', { headers: { test: 'unit' } })
            .options(
                {
                    headers: {
                        test: 'unit',
                    },
                },
                true,
            )
            .headers(
                {
                    testheaders: 'unit-test',
                },
                true,
            )
            .url('http://localhost:0001', true)
            .send();

        expect(got).toHaveBeenCalledWith('http://localhost:0001', {
            headers: {
                testheaders: 'unit-test',
            },
        });
    });

    test('Response params', async () => {
        expect.assertions(1);

        await new Request('http://localhost:0000')
            .method('get')
            .headers({
                testheaders: 'unit-test',
            })
            .qs({
                testqs: 1,
            })
            .url('/test')
            .body({
                testbody: 'test-body',
            })
            .jsonSchemaJsonPath(['json', 'path'])
            .options({
                agent: false,
            })
            .modelsLocation('models/path')
            .send();

        expect(Response).toHaveBeenCalledWith(
            {
                url: 'http://localhost:0000/test',
                body: {
                    testbody: 'test-body',
                },
                httpVersion: 1,
                headers: {
                    testheaders: 'unit-test',
                },
                method: 'mock',
                statusCode: 100,
                statusMessage: 'ok',
                requestUrl: 'http://localhost:0000/test',
                ip: '0.0.0.0',
            },
            {
                location: 'models/path',
                path: ['json', 'path'],
            },
        );
    });
});
