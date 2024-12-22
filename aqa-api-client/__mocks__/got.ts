const got = jest.fn().mockImplementation(args => {
    return {
        url: args,
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
        requestUrl: args,
        ip: '0.0.0.0',
    };
});

export default got;
