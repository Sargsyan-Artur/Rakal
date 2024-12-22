import {IServiceTestEnvData, ITestDataItem, IUiTestEnvData, TServicesTestEnv, TUiAndServiceTestEnv, TUiTestEnv} from './types/types';
import {nconf} from './configs/nconf.conf';
import {Logger} from './configs/log4js.conf';

const logger = Logger('@rak-aqa/utils [Environment]');

let testEnv: Readonly<TUiTestEnv | TServicesTestEnv | TUiAndServiceTestEnv>;

export function setTestEnvConf(config: TUiAndServiceTestEnv[]): Readonly<TUiAndServiceTestEnv>;
export function setTestEnvConf(config: TUiTestEnv[]): Readonly<TUiTestEnv>;
export function setTestEnvConf(config: TServicesTestEnv[]): Readonly<TServicesTestEnv>;
export function setTestEnvConf(
    config: (Readonly<TUiTestEnv | TServicesTestEnv | TUiAndServiceTestEnv>)[],
): TUiTestEnv | TServicesTestEnv | TUiAndServiceTestEnv {

    if (config.find(item => !item.hasOwnProperty('id'))) {
        throw new Error('Please add "id" property to the environment configurations');
    }

    if (nconf.get('testenv') && !config.find(({id}) => id !== nconf.get('testenv'))) {
        throw new Error(`Passed 'testenv' cli param: '${nconf.get('testenv')}' doesn't exist in the configuration.`);
    }

    if (nconf.get('TEST_ENV') && !config.find(({id}) => id !== nconf.get('TEST_ENV'))) {
        throw new Error(`Passed 'TEST_ENV' env var: '${nconf.get('TEST_ENV')}' doesn't exist in the configuration.`);
    }

    if (!nconf.get('testenv')
        && !nconf.get('TEST_ENV')
        && !nconf.get('testurl')
        && !nconf.get('TEST_URL')
        && !config.find(item => item.default)
    ) {
        throw new Error('Please either setup "default" environment in the config file' +
            '\n\tor pass in cli one of the following params: --testenv=%string% OR --testurl=%string%' +
            '\n\tor setup on of the following env vars: TEST_ENV or TEST_URL' +
            '\n\tPriority of parameters: --testenv > --testurl > TEST_ENV > TEST_URL > default',
        );
    }

    testEnv = _findConfig(config);

    if (!testEnv) {
        throw new Error('There is no match for the requested test configuration');
    }

    return testEnv;
}

export function getCurrentTestEnv(): Readonly<TUiTestEnv | TServicesTestEnv | TUiAndServiceTestEnv> {
    return testEnv;
}

export function getCurrentTestData(type: 'ui' | string, id: string): ITestDataItem {
    type = type.toLowerCase();
    let data: IUiTestEnvData['data'] | IServiceTestEnvData['data'];

    if (type === 'ui') {
        if (!testEnv.ui) {
            throw new Error('There is no "ui" configuration in "testEnv"');
        }
        data = testEnv.ui.data;
    } else {
        if (!testEnv.services) {
            throw new Error('There is no "services" configuration in "testEnv"');
        }

        if (!testEnv.services.hasOwnProperty(type)) {
            throw new Error(`There is no '${type}' service in 'testEnv.services'`);
        }

        data = testEnv.services[type]!['data'];
    }

    if (!data) {
        throw new Error(`There is no "data" in "testEnv" for '${type}'`);
    }

    const value = data.find(item => item.id === id);

    if (!value) {
        throw new Error(`There is no value for '${id}' id in data of testEnv`);
    }

    return value;
}

function _findConfig(
    config: (Readonly<TUiTestEnv | TServicesTestEnv | TUiAndServiceTestEnv>)[],
): Readonly<TUiTestEnv | TServicesTestEnv | TUiAndServiceTestEnv> {
    return config.find(item => {
        if (nconf.get('testenv')) {
            return item.id === nconf.get('testenv');
        } else if (nconf.get('testurl')) {

            if (!config.find(conf => conf.id === 'fb')) {
                throw new Error('Please add configuration for "fb" env in order to use "--testurl"');
            }

            if (item.id === 'fb') {
                let isDone = false;
                if (item.ui) {
                    item.ui.url = nconf.get('testurl');
                    isDone = true;
                }
                if (item.services) {
                    const mainService = _findMainService(item.services);

                    if (!mainService && !item.ui) {
                        throw new Error('Please add "main" service in order to use "testurl"');
                    }

                    if (mainService) {
                        mainService.url = nconf.get('testurl');
                        isDone = true;
                    }
                }
                return isDone;
            }
            return false;
        } else if (nconf.get('TEST_ENV')) {
            return item.id === nconf.get('TEST_ENV');
        } else if (nconf.get('TEST_URL')) {

            if (!config.find(conf => conf.id === 'fb')) {
                throw new Error('Please add configuration for "fb" env in order to use "TEST_URL" env var');
            }

            if (item.id === 'fb') {
                let isDone = false;
                if (item.ui) {
                    item.ui.url = nconf.get('TEST_URL');
                    isDone = true;
                }
                if (item.services) {
                    const mainService = _findMainService(item.services);

                    if (!mainService && !item.ui) {
                        throw new Error('Please add "main" service in order to use "TEST_URL" env var');
                    }

                    if (mainService) {
                        mainService.url = nconf.get('TEST_URL');
                        isDone = true;
                    }
                }
                return isDone;
            }
            return false;
        } else {
            return item.default;
        }
    })!;
}

function _findMainService(services: Record<string, IServiceTestEnvData>): IServiceTestEnvData | undefined {
    const mainServices: IServiceTestEnvData[] = [];

    for (const servicesKey in services) {
        if (services[servicesKey]!.main) {
            mainServices.push(services[servicesKey]!);
        }
    }

    if (mainServices.length > 1) {
        logger.warn('More than one main service were found. The first service will be used automatically');
    }

    return mainServices[0];
}
