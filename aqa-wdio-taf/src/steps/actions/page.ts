import { Given, When } from '@wdio/cucumber-framework';
import { parse } from '@rak-aqa/utils';

import { PoHandler } from '../../core/po';
import { TBrowserNavigation } from '../../types';

Given(/^I navigate to '(.*)' page$/, async (query: string) => {
    return PoHandler.init(`${query} page`).page.open();
});

When(/^I am on '(.*)' url$/, async (url: string) => {
    return browser.url(parse<string>(url));
});

When(/^I open '(.*)' page in new tab$/, async (query: string) => {
    return PoHandler.init(`${query} page`).page.openNewWindow();
});

When(/^I open page by '(.*)' url in new tab$/, async (url: string) => {
    return browser.newWindow(parse<string>(url));
});

When(/^I click on browser (back|forward|refresh) button$/, async (navigation: TBrowserNavigation) => {
    switch (navigation) {
        case 'back':
            return browser.back();
        case 'forward':
            return browser.forward();
        case 'refresh':
            return browser.refresh();
        default:
            throw new Error(`There is no browser navigation type with ${navigation} name.`);
    }
});

When(/^I switch window to '(.*)'$/, async (urlOrTitle: string) => {
    return browser.switchWindow(parse<string>(urlOrTitle));
});

When(/^I switch to '(.*)' frame on the page$/, async (query: string) => {
    return PoHandler.init(`${query} page`).page.switchToFrame();
});
