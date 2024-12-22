import * as path from 'path';

export const ARTIFACTS_CONF = {
    dir: path.resolve(path.join(process.cwd(), '/artifacts')),
    log4js: {
        dir: path.resolve(path.join(process.cwd(), '/artifacts/log4js')),
    },
};
