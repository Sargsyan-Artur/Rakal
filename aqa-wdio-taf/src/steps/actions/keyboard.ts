import { When } from '@wdio/cucumber-framework';
import { parse } from '@rak-aqa/utils';

import { PoHandler } from '../../core/po';
import { getRandomString } from '../../helpers';
import { TRandomStringType, TOs } from '../../types';

When(/^I type '(.*)' in '(.*)' field$/, (text: string, query: string) => {
    return PoHandler.init(query).element.setValue(parse<string>(text));
});

When(
    /^I clear value in '(.*)'( with keyboard)?(?: on )?(windows|macos)?$/,
    async (query: string, keyboard: string | undefined, os: TOs) => {
        if (keyboard) {
            return PoHandler.init(query).element.clearValueWithKeyboard(os);
        }
        return PoHandler.init(query).element.clearValue();
    },
);

When(
    /^I type random (?:'(\d+)' )?(alphabetic|numeric|alphanumeric)?(?:\s)?values in '(.*)' field$/,
    async (count: number | null, type: TRandomStringType | null, query: string) => {
        return PoHandler.init(query).element.setValue(getRandomString(count ?? undefined, type ?? undefined));
    },
);

When(/^I type '(.*)' in '(.*)' field with existing value$/, async (text: string, query: string) => {
    return PoHandler.init(query).element.addValue(parse<string>(text));
});

When(/^I type '(.*)' text as unique value in '(.*)' field$/, async (text: string, query: string) => {
    return PoHandler.init(query).element.setValue(`${parse<string>(text)}_${getRandomString()}`);
});

When(/^I press '(.*)' on the keyboard$/, async (keyName: string) => {
    const keyNames = keyName.split(',').map(key => key.trim());
    return browser.keys(keyNames);
});

When(/^I press '(.*)' on the keyboard '(\d+)' times$/, async (keyName: string, number: string) => {
    const keyNames = keyName.split(',').map(key => key.trim());
    for (let i = 0; i < Number(number); i++) {
        await browser.keys(keyNames);
    }
});

When(/^I press '(.*)' on the keyboard while having focus on '(.*)'$/, async (keyName: string, query: string) => {
    const keyNames = keyName.split(',').map(key => key.trim());
    return PoHandler.init(query).element.focusAndSendKeys(keyNames);
});
