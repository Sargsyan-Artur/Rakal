import { BaseExpects } from './base.expects';

export class PageExpects extends BaseExpects {
    private get browserExpect(): ExpectWebdriverIO.Matchers<WebdriverIO.Browser, WebdriverIO.Browser> {
        if (this._not) {
            this._not = false;
            return expect(browser).not;
        }
        return expect(browser);
    }

    public toHaveUrl(url = `${browser.config.baseUrl!}${this.locatorHandler.locator.page.url}`): WebdriverIO.Browser {
        return this.browserExpect.toHaveUrl(url);
    }
}
