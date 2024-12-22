import {Memory} from './memory';
import {extractConstValue} from './utils';
import {TServicesTestEnv, TUiAndServiceTestEnv, TUiTestEnv} from './types/types';

const DELIMITERS = {
    memory: '#$',
    constants: '#$$',
};

interface IHandler {
    readonly memory: Memory;
    readonly testEnv: () => TUiTestEnv | TServicesTestEnv | TUiAndServiceTestEnv;
}

// tslint:disable-next-line:no-any
export const valueParser = (handler: IHandler) => <T = any>(key: unknown): T => {
    if (typeof key === 'string') {
        if (key.startsWith(DELIMITERS.constants)) {
            const currentEnv = handler.testEnv();
            if (!currentEnv.constants) {
                throw new Error('There is no "constants" in the testEnv.');
            }

            return extractConstValue<T>(currentEnv.constants, key.substring(3));
        }

        if (key.startsWith(DELIMITERS.memory)) {
            return handler.memory.get(key.substring(2)) as T;
        }
    }

    return key as T;
};
