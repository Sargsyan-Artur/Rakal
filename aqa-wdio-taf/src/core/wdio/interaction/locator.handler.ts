import * as util from 'util';
import Logger from '@wdio/logger';

import { EElementType } from './enum';
import { TElement, TLocator } from '../../../types';

const logger = Logger('LocatorHandler');

const setTimeoutPromise = util.promisify(setTimeout);

export class LocatorHandler {
    private element?: TElement;

    constructor(public readonly locator: TLocator, private readonly type: EElementType) {}

    public async getElement(): Promise<TElement>;
    public async getElement(params: 'one'): Promise<WebdriverIO.Element>;
    public async getElement(params?: 'one'): Promise<TElement> {
        if (typeof this.element !== 'undefined') {
            this.element = undefined;
        }

        const elems = this.type === EElementType.element ? this.locator.element : this.locator.page.element;

        for (const elem of elems) {
            if (typeof elem === 'string') {
                await this.findElement(elem);
                continue;
            }

            if (elem.selector && !elem.isCollection) {
                await this.findElement(elem.selector);
                continue;
            }

            if (elem.selector && elem.isCollection) {
                if (typeof elem.index !== 'undefined' || (typeof elem.index === 'undefined' && !elem.text)) {
                    if (params === 'one' || typeof elem.index !== 'undefined') {
                        if (typeof elem.index === 'undefined') {
                            logger.warn(
                                `[getElement > findElementsByIndex] Used 0 index by default for the passed collection with '${elem.selector}' selector. Please specify the index for the last selector if 0 index isn't applicable.`,
                            );
                        }

                        await this.findElementsByIndex(elem.selector, typeof elem.index !== 'undefined' ? elem.index : 0);
                    } else {
                        await this.findElementsByIndex(elem.selector);
                    }
                    continue;
                }

                if (elem.text) {
                    // because of wdio issue with DDOSing browser
                    await this.repeater(() => this.findElementsByText(elem.selector, elem.text!), 3);
                    continue;
                }
            }
            throw new Error(`The '${JSON.stringify(elem)} doesn't equal 'TSelector' type`);
        }

        this.throwError(this.element);

        if (params === 'one') {
            if (Array.isArray(this.element)) {
                logger.warn(
                    `[getElement] Used 0 index by default for the passed collection. Please specify the index for the last selector if 0 index isn't applicable.`,
                );
                return this.element[0]!;
            }
            return this.element!;
        }

        return this.element!;
    }

    private async findElement(selector: string): Promise<WebdriverIO.Element> {
        if (this.element) {
            if (Array.isArray(this.element)) {
                logger.warn(
                    `[findElement] Used 0 index by default for the parent collection of '${selector}' selector. Please specify the index if 0 isn't applicable.`,
                );
                this.element = await this.element[0]?.$(selector)!;
                return this.element;
            }
            this.element = await this.element.$(selector);
            return this.element;
        }
        this.element = await $(selector);
        return this.element;
    }

    private async findElementsByIndex(selector: string): Promise<WebdriverIO.ElementArray>;
    private async findElementsByIndex(selector: string, index: number): Promise<WebdriverIO.Element>;
    private async findElementsByIndex(selector: string, index?: number): Promise<WebdriverIO.ElementArray | WebdriverIO.Element> {
        if (this.element) {
            if (Array.isArray(this.element)) {
                logger.warn(
                    `[findElementsByIndex] Used 0 index by default for the parent collection of '${selector}' selector. Please specify the index if 0 isn't applicable.`,
                );

                if (typeof index !== 'undefined') {
                    // eslint-disable-next-line @typescript-eslint/await-thenable
                    this.element = await this.element[0]!.$$(selector)[index]!;
                    return this.element;
                }
                this.element = await this.element[0]!.$$(selector);
                return this.element;
            }
            if (typeof index !== 'undefined') {
                // eslint-disable-next-line @typescript-eslint/await-thenable
                this.element = await this.element.$$(selector)[index]!;
                return this.element;
            }
            this.element = await this.element.$$(selector);
            return this.element;
        }

        if (typeof index !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/await-thenable
            this.element = await $$(selector)[index]!;
            return this.element;
        }
        this.element = await $$(selector);
        return this.element;
    }

    private async findElementsByText(selector: string, text: string): Promise<WebdriverIO.Element> {
        if (this.element) {
            if (Array.isArray(this.element)) {
                logger.warn(
                    `[findElementsByText] Used 0 index by default for the parent collection of '${selector}' selector. Please specify the index if 0 isn't applicable.`,
                );
                this.element = await this.textFinder(await this.element[0]!.$$(selector), text);
                return this.element;
            }

            this.element = await this.textFinder(await this.element.$$(selector), text);
            return this.element;
        }

        this.element = await this.textFinder(await $$(selector), text);
        return this.element;
    }

    private async textFinder(elementArray: WebdriverIO.ElementArray, text: string): Promise<WebdriverIO.Element> {
        if (Array.isArray(elementArray) && elementArray.length === 0) {
            throw new Error(`[findElementsByText > textFinder] No elements found to search for text: ${text}`);
        }

        const texts: string[] = await Promise.all(elementArray.map(el => el.getText()));
        let index = this.findIndex(texts, text.toLowerCase());

        if (index < 0) {
            const values: string[] = await Promise.all(elementArray.map(el => el.getValue())); // TODO experimental: el.getValue()
            index = this.findIndex(values, text.toLowerCase());
        }

        if (index < 0) {
            throw new Error(`[findElementsByText > textFinder] There is no matched "${text}" text/value in the elements.`);
        }

        return elementArray[index]!;
    }

    private findIndex(items: string[], value: string): number {
        try {
            return items.map(item => item.trim().toLowerCase()).findIndex(item => item === value || item.includes(value)); // TODO experimental: item.includes(value)
        } catch (e) {
            return -1;
        }
    }

    // todo experimental
    private async repeater(cd: () => Promise<unknown>, attempt = 1): Promise<void> {
        let err: Error;

        try {
            for (let i = 0; i < attempt; i++) {
                try {
                    await cd();
                    break;
                } catch (e) {
                    logger.warn('Repeating element research.');
                    err = e as Error;

                    await setTimeoutPromise(150);
                }
            }
        } catch (e) {
            throw err!;
        }
    }

    private throwError(element?: TElement): void {
        const elems = this.type === EElementType.element ? this.locator.element : this.locator.page.element;

        if (Array.isArray(element) && element.length === 0) {
            throw new Error(`The elements weren't found with '${JSON.stringify(elems)}' locator`);
        }

        if (typeof element === 'undefined') {
            throw new Error(`The element wasn't found with '${JSON.stringify(elems)}' locator`);
        }
    }
}
