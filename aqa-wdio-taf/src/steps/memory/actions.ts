import { When } from '@wdio/cucumber-framework';
import { memory } from '@rak-aqa/utils';

import { PoHandler } from '../../core/po';
import { TRandomStringType, TElementPosition } from '../../types';
import { getRandomString } from '../../helpers';

When(/^I remember the text of '(.+)' as '(.+)'$/, async (query: string, keyName: string) => {
    const text = await PoHandler.init(query).element.getText();
    memory.set(keyName, text);
});

When(
    /^I remember the text of the (first|last|\d+) element of '(.*)' collection as '(.*)'$/,
    async (position: TElementPosition, query: string, keyName: string) => {
        const text = await PoHandler.init(query).element.getText();

        if (Array.isArray(text)) {
            let item: string | undefined;
            switch (position) {
                case 'first':
                    item = text.shift();
                    break;
                case 'last':
                    item = text.pop();
                    break;
                default:
                    item = text[+position];
            }

            if (!item) {
                throw new Error(`There is not text under ${position} condition.`);
            }

            return memory.set(keyName, item);
        }
        throw new Error('Found element is not an array');
    },
);

When(/^I remember the value of '(.+)' as '(.+)'$/, async (query: string, keyName: string) => {
    const value = await PoHandler.init(query).element.getValue();
    memory.set(keyName, value);
});

When(/^I remember the '(.+)' attribute of '(.+)' as '(.+)'$/, async (attributeName: string, query: string, keyName: string) => {
    const attribute = await PoHandler.init(query).element.getAttributeText(attributeName);
    memory.set(keyName, attribute);
});

When(/^I remember the number of '(.+)' as '(.+)'$/, async (query: string, keyName: string) => {
    const elems = await PoHandler.init(query).element.wdioElement();
    const elemsLength = Array.isArray(elems) ? elems.length : 1;
    memory.set(keyName, elemsLength);
});

When(/^I remember the order of '(.+)' as '(.+)'$/, async (query: string, keyName: string) => {
    const elementsText = await PoHandler.init(query).element.getText();
    const order = Array.isArray(elementsText) ? elementsText : [elementsText];
    memory.set(keyName, order);
});

When(/^I remember the '(.+)' CSS property value of '(.+)' as '(.+)'$/, async (property: string, query: string, keyName: string) => {
    const { value: actualPropertyValue } = await PoHandler.init(query).element.getCSSPropertyValue(property);
    memory.set(keyName, actualPropertyValue);
});

When(/^I delete '(.+)' from memory$/, (keyName: string) => memory.delete(keyName));

When(/^I clear memory$/, () => memory.clear());

When(
    /^I remember random (?:'(\d+)' )?(alphabetic |numeric |alphanumeric )?(?:\s )?values as '(.+)'$/,
    (count: number, type: TRandomStringType | null, keyName: string) => {
        memory.set(keyName, getRandomString(count, type ?? undefined));
    },
);
