import { Then } from '@wdio/cucumber-framework';

import { PoHandler } from '../../core/po';

Then(/^I should be on '(.*)' page$/, async (query: string) => {
    return PoHandler.init(`${query} page`).page.isOpened();
});
