import type { WaitForOptions, WaitUntilOptions } from 'webdriverio/build/types';

import { LocatorHandler } from '../interaction';
import { EElementType } from '../interaction/enum';
import { TLocator } from '../../../types';

// todo wait for one element or all?
export abstract class BaseWaits {
    protected readonly locatorHandler: LocatorHandler;

    constructor(locator: TLocator, type: EElementType) {
        this.locatorHandler = new LocatorHandler(locator, type);
    }

    public async forDisplayed(params?: WaitForOptions): Promise<true | void> {
        const el = await this.locatorHandler.getElement('one');
        return el.waitForDisplayed(params);
    }

    public async forClickable(params?: WaitForOptions): Promise<true | void> {
        const el = await this.locatorHandler.getElement('one');
        return el.waitForClickable(params);
    }

    public async forEnabled(params?: WaitForOptions): Promise<true | void> {
        const el = await this.locatorHandler.getElement('one');
        return el.waitForEnabled(params);
    }

    public async forExist(params?: WaitForOptions): Promise<true | void> {
        const el = await this.locatorHandler.getElement('one');
        return el.waitForExist(params);
    }

    public async until(condition: () => boolean | Promise<boolean>, options?: Partial<WaitUntilOptions>): Promise<true | void> {
        return browser.waitUntil(condition, options);
    }
}
