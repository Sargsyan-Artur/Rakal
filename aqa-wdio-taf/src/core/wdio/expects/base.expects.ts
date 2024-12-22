import * as Chai from 'chai';
import Logger, { Logger as TLogger } from '@wdio/logger';

import { TLocator } from '../../../types';
import { LocatorHandler } from '../interaction';
import { EElementType } from '../interaction/enum';

export abstract class BaseExpects {
    protected _not = false;

    protected readonly locatorHandler: LocatorHandler;
    protected readonly logger: TLogger;
    private readonly _chaiExpect: Chai.ExpectStatic;

    constructor(locator: TLocator, type: EElementType) {
        this.locatorHandler = new LocatorHandler(locator, type);
        this.logger = Logger(this.constructor.name);
        this._chaiExpect = Chai.expect;
    }

    public get not(): this {
        this._not = true;
        return this;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    protected chaiExpect(exp: any): Chai.Assertion {
        if (this._not) {
            this._not = false;
            return this._chaiExpect(exp).not;
        }
        return this._chaiExpect(exp);
    }
}
