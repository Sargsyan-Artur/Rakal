import {Configuration, configure, getLogger} from 'log4js';

import {nconf} from './nconf.conf';

const conf: Configuration = {
    appenders: {
        console: {
            type: 'stdout',
            layout: {
                type: 'coloured',
            },
        },
    },
    categories: {
        default: {
            appenders: ['console'],
            level: nconf.get('logLevel'),
        },
    },
};

configure(conf);

export const Logger = (namespace: string) => getLogger(`${namespace} - PID ${process.pid}`);
