import nconf from 'nconf';

import {Logger} from './configs/log4js.conf';

interface IParams {
    readonly env: string;
    readonly cli: string;
}

const logger = Logger('cli-to-env');

export const setEnvVarFromCli = (params: IParams[]) => {
    for (const param of params) {
        if (process.env[param.env]) {
            logger.warn(`${param.env} env var will be overwritten by ${param.cli} cli param.`);
        }

        if (typeof nconf.get(param.cli) !== 'undefined') {
            process.env[param.env] = nconf.get(param.cli);
        }
    }
};
