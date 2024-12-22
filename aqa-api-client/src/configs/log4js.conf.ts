import { Configuration, configure, getLogger, Logger as log4js } from 'log4js';

import { ARTIFACTS_CONF } from './artifacts.conf';
import { nconf } from './nconf.conf';

const conf: Configuration = {
    appenders: {
        file: {
            type: 'file',
            filename: `${ARTIFACTS_CONF.log4js.dir}/${new Date().valueOf()}_PID_${process.pid}_api.log`,
        },
        console: {
            type: 'stdout',
            layout: {
                type: 'coloured',
            },
        },
    },
    categories: {
        default: {
            appenders: ['console', 'file'],
            level: nconf.get('logLevel'),
        },
    },
};

configure(conf);

export const Logger = (namespace: string): log4js => getLogger(`${namespace} - PID ${process.pid}`);
