import * as log4js from 'log4js';

import {Logger} from './configs/log4js.conf';

interface IMemoryConf {
    readonly overwrite: boolean;
}

export class Memory<Value = unknown> {

    private isChanged = false;

    private readonly cache: Map<string, Value> = new Map<string, Value>();
    private readonly logger: log4js.Logger;

    constructor(private _conf: IMemoryConf) {
        this.logger = Logger('Memory');
    }

    public config(conf: IMemoryConf): void {
        if (this.isChanged) {
            this.logger.warn('Memory configuration can be changed only one time per test run.');
            return;
        }
        this._conf = conf;
        this.isChanged = true;
    }

    public has(key: string): boolean {
        return this.cache.has(key);
    }

    public set(key: string, value: Value): void {
        if (this.has(key)) {
            if (!this._conf.overwrite) {
                throw new Error(`Cannot overwrite value of '${key}' key.`);
            }
            this.logger.warn(`Overwriting value of '${key}' key in '${value}' value`);
        }
        this.cache.set(key.trim(), value);
    }

    // tslint:disable-next-line:no-any
    public get(key: string): any {
        if (!this.has(key)) {
            throw new Error(`There is no such key as '${key}' in memory`);
        }
        return this.cache.get(key)!;
    }

    public delete(key: string): boolean {
        if (!this.has(key)) {
            throw new Error(`There is no such key as '${key}' in memory`);
        }
        return this.cache.delete(key);
    }

    public clear() {
        this.logger.warn('Cleared the all cache');
        return this.cache.clear();
    }
}
