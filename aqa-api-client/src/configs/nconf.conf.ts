import nconfLib from 'nconf';

export const nconf = nconfLib.argv({
    logLevel: {
        description: 'level of displayed logs',
        demandOption: true,
        choices: ['info', 'trace', 'debug', 'warn', 'error', 'all', 'fatal', 'off'],
        type: 'string',
        default: 'info',
    },
});
