import { When } from '@wdio/cucumber-framework';
import { parse } from '@rak-aqa/utils';

import { PoHandler } from '../../core/po';
import { TElementPosition } from '../../types';

When(/^I click on '(.*)' element$/, async (query: string): Promise<void> => {
    return PoHandler.init(query).element.click();
});

When(/^I click outside of '(.*)' element(?: with (\d+) pixel offset)?$/, async (query: string, offset?: number) => {
    const options = {
        x: offset ?? -5,
        y: offset ?? -5,
    };

    return PoHandler.init(query).element.click(options);
});

When(
    /^I click on '(.*)' element with text '(.*)'( being case insensitive)?$/,
    async (query: string, text: string, ignoreCase?: boolean): Promise<void> => {
        return PoHandler.init(query).element.clickText(parse(text), ignoreCase);
    },
);

When(/^I select '(.*)' element to upload '(.*)' file$/, async (query: string, pathToFile: string): Promise<void> => {
    return PoHandler.init(query).element.uploadFile(pathToFile);
});

When(
    /^I should select '(.*)' element by '(.*)' attribute with '(.*)' value$/,
    async (query: string, attribute: string, value: string): Promise<void> => {
        return PoHandler.init(query).element.selectByAttribute(attribute, value);
    },
);

When(
    /^I scroll to the '(.*)' element(?: with (start|center|end|nearest) block)?$/,
    async (query: string, block?: ScrollLogicalPosition) => {
        const scrollOptions: ScrollIntoViewOptions = {};

        if (block) {
            scrollOptions.block = block;
        }

        return PoHandler.init(query).element.scrollIntoView(scrollOptions);
    },
);

When(/^I scroll to the (top|bottom) of the '(.*)' page$/, async (condition: 'top' | 'bottom', query: string) => {
    return PoHandler.init(`${query} page`).page.element.scrollIntoView(condition === 'top');
});

When(/^I move mouse over '(.*)' element$/, async (query: string) => {
    return PoHandler.init(query).element.moveTo();
});

When(
    /^I drag and drop '(.*)' element to (?:(?:'(.*)' element)|(?:'x:(.+)' and 'y:(.+)' coordinates))$/,
    async (querySource: string, queryDestination?: string, x?: string, y?: string) => {
        if (typeof x !== 'undefined' && typeof y !== 'undefined') {
            return PoHandler.init(querySource).element.dragAndDrop({ x: Number(x), y: Number(y) }, { duration: 500 });
        }

        if (queryDestination) {
            const destinationEl = await PoHandler.init(queryDestination).element.wdioElement('one');
            return PoHandler.init(querySource).element.dragAndDrop(destinationEl, { duration: 500 });
        }
        throw new Error('Please specify either "queryDestination" or "x" and "y" coordinates');
    },
);

When(/^I click on the (first|last|\d+) element of '(.*)' collection$/, async (position: TElementPosition, query: string) => {
    const wdioElement = await PoHandler.init(query).element.wdioElement();

    if (Array.isArray(wdioElement)) {
        let element: WebdriverIO.Element | undefined;
        switch (position) {
            case 'first':
                element = wdioElement.shift();
                break;
            case 'last':
                element = wdioElement.pop();
                break;
            default:
                element = wdioElement[+position];
                break;
        }

        if (!element) {
            throw new Error(`There are not elements under ${position} position.`);
        }

        return element.click();
    }
    throw new Error('Found element is not an array');
});
