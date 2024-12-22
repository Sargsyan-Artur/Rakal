import path from 'path';
import { DragAndDropCoordinate, DragAndDropOptions, MoveToOptions, ParsedCSSValue, ClickOptions } from 'webdriverio';

import { ElementExpects } from '../expects';
import { ElementWaits } from '../waits';
import { LocatorHandler } from './locator.handler';
import { EElementType } from './enum';
import { TElement, TLocator, TOs } from '../../../types';

export class Element {
    public readonly wait: ElementWaits;
    public readonly expect: ElementExpects;

    private readonly locatorHandler: LocatorHandler;

    constructor(locator: TLocator, type: EElementType) {
        this.locatorHandler = new LocatorHandler(locator, type);
        this.wait = new ElementWaits(locator, type);
        this.expect = new ElementExpects(this, locator, type);
    }

    public wdioElement(): Promise<TElement>;
    public wdioElement(params: 'one'): Promise<WebdriverIO.Element>;
    public wdioElement(params?: 'one'): Promise<TElement> {
        return params ? this.locatorHandler.getElement(params) : this.locatorHandler.getElement();
    }

    public async click(options?: ClickOptions): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        return el.click(options);
    }

    public async clickText(text: string, ignoreCase?: boolean): Promise<void> {
        const elements = await this.locatorHandler.getElement();
        const texts = await this.getText();

        if (Array.isArray(texts)) {
            const index = texts
                .map(value => (ignoreCase ? value.toLowerCase() : value))
                .map(value => value.trim())
                .findIndex(value => value === (ignoreCase ? text.toLowerCase() : text));

            if (index < 0) {
                throw new Error(
                    `There is no matched "${text}" text in the element. Current element: "${JSON.stringify(this.locatorHandler.locator)}"`,
                );
            }

            return (elements as WebdriverIO.ElementArray)[index]!.click();
        }

        if (!(ignoreCase ? texts.toLowerCase() : texts).includes(ignoreCase ? text.toLowerCase() : text)) {
            throw new Error(`There is no element in "${JSON.stringify(this.locatorHandler.locator)}" with "${text}" text found`);
        }

        return (elements as WebdriverIO.Element).click();
    }

    public async getCSSPropertyValue(property: string): Promise<ParsedCSSValue> {
        const el = await this.locatorHandler.getElement('one');
        return el.getCSSProperty(property);
    }

    public async setValue(value: string): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        return el.setValue(value);
    }

    public async getValue(): Promise<string> {
        const el = await this.locatorHandler.getElement('one');
        return el.getValue();
    }

    public async isVisible(): Promise<boolean | undefined> {
        const el = await this.locatorHandler.getElement('one');
        return el.isDisplayed();
    }

    public async clearValue(): Promise<void> {
        // method doesn't work correctly with all inputs
        const el = await this.locatorHandler.getElement('one');
        return el.clearValue();
    }

    public async clearValueWithKeyboard(os: TOs = 'windows'): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        await el.click();
        if (os === 'windows') {
            await browser.keys(['Control', 'a']);
        } else {
            await browser.keys(['Meta', 'a']);
        }
        return browser.keys(['Delete']);
    }

    public async addValue(value: string): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        return el.addValue(value);
    }

    public async focusAndSendKeys(value: string | string[]): Promise<void> {
        await this.click();
        return browser.keys(value);
    }

    public async getText(): Promise<string | string[]> {
        const elements = await this.locatorHandler.getElement();
        return Array.isArray(elements) ? Promise.all(elements.map(element => element.getText())) : elements.getText();
    }

    public async selectByAttribute(attribute: string, value: string): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        return el.selectByAttribute(attribute, value);
    }

    public async getAttributeText(attributeName: string): Promise<string> {
        const el = await this.locatorHandler.getElement('one');
        return el.getAttribute(attributeName);
    }

    public async uploadFile(pathToFile: string): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        const remoteFilePath = await browser.uploadFile(path.join(process.cwd(), pathToFile));
        return el.setValue(remoteFilePath);
    }

    public async scrollIntoView(scrollIntoViewOptions?: boolean | ScrollIntoViewOptions): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        return el.scrollIntoView(scrollIntoViewOptions);
    }

    public async moveTo(offset?: MoveToOptions): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        return el.moveTo(offset);
    }

    public async dragAndDrop(target: WebdriverIO.Element | DragAndDropCoordinate, options?: DragAndDropOptions): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        return el.dragAndDrop(target, options);
    }

    public async doubleClick(): Promise<void> {
        const el = await this.locatorHandler.getElement('one');
        return el.doubleClick();
    }
}
