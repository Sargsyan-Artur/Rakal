import { When } from '@wdio/cucumber-framework';

When(/^I should wait (\d+) seconds$/, async (seconds: number) => {
    return browser.pause(seconds * 1000);
});
