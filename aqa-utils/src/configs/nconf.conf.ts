import nconfLib from 'nconf';

export const nconf = nconfLib
    .env([
        'TEST_ENV',
        'TEST_URL',
    ])
    .argv({
        logLevel: {
            description: 'level of displayed logs',
            demandOption: true,
            choices: ['info', 'trace', 'debug', 'warn', 'error', 'all', 'fatal', 'off'],
            type: 'string',
            default: 'info',
        },
        testenv: {
            describe: 'Name of testenv',
            choices: ['local', 'fb', 'dev1', 'qa1', 'uat', 'prd'],
        },
        testurl: {
            describe: 'URL for autotests. If a URL passed, then "fb" config will be used automatically',
            type: 'string',
        },
    });
