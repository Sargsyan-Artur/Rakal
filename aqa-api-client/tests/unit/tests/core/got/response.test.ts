import { Response } from '../../../../../src/core/got';

jest.mock('log4js');

describe('core > got > Response', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('instance', () => {
        expect.assertions(8);

        const resp = new Response(
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

        expect(JSON.stringify(resp.body)).toBe(JSON.stringify({ testbody: 'test-body' }));

        expect(resp.url).toBe('http://localhost:0000/test');

        expect(resp.requestUrl).toBe('http://localhost:0000/test');

        expect(JSON.stringify(resp.headers)).toBe(JSON.stringify({ testheaders: 'unit-test' }));

        expect(resp.ip).toBe('0.0.0.0');

        expect(resp.httpVersion).toBe(1);

        expect(resp.method).toBe('mock');

        expect(JSON.stringify(resp.status)).toBe(
            JSON.stringify({
                statusCode: 100,
                statusMessage: 'ok',
            }),
        );
    });
});
