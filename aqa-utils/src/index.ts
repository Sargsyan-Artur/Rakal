import {Memory} from './memory';
import {valueParser} from './value.parser';
import {getCurrentTestEnv} from './environment';

export * from './types/types';
export * from './environment';
export * from './cli.env.transformer';
export * from './string';
export * from './object';

export const memory = new Memory({overwrite: false});
export const parse = valueParser({memory, testEnv: getCurrentTestEnv});
