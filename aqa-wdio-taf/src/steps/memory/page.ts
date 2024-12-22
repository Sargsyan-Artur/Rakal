import { When } from '@wdio/cucumber-framework';
import { memory } from '@rak-aqa/utils';

When(/^I remember the page URL as '(.+)'$/, (keyName: string) => memory.set(keyName, browser.getUrl()));
