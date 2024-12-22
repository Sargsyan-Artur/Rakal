import { Element } from './element';
import { PageExpects } from '../expects';
import { PageWaits } from '../waits';
import { EElementType } from './enum';
import { TLocator } from '../../../types';

export class Page {
    public readonly expect: PageExpects;
    public readonly wait: PageWaits;

    private readonly _element: Element;

    constructor(private readonly locator: TLocator) {
        const type = EElementType.page;
        this._element = new Element(this.locator, type);
        this.expect = new PageExpects(this.locator, type);
        this.wait = new PageWaits(this.locator, type);
    }

    public get element(): Element {
        return this._element;
    }

    public open(): Promise<string> {
        return browser.url(this.locator.page.url);
    }

    // todo refactoring is needed. Move to src/core/wdio/expects/page.expects.ts
    public async isOpened(): Promise<WebdriverIO.Browser> {
        await this.element.expect.toBeDisplayed();
        return this.expect.toHaveUrl();
    }

    public async openNewWindow(): Promise<string> {
        return browser.newWindow(this.locator.page.url);
    }

    public async switchToFrame(): Promise<void> {
        const el = await this.element.wdioElement('one');
        return browser.switchToFrame(el);
    }
}
