import { Then } from '@wdio/cucumber-framework';

import { TElementStateCondition, TTextCondition } from '../../types';
import { PoHandler } from '../../core/po';

Then(
    /^I should wait for '(.*)' element (not )?(be displayed|be clickable|exist|be enabled)$/,
    async (query: string, negation: string | undefined, condition: TElementStateCondition) => {
        const { wait } = PoHandler.init(query).element;

        switch (condition) {
            case 'be displayed':
                return wait.forDisplayed({ reverse: !!negation });
            case 'be clickable':
                return wait.forClickable({ reverse: !!negation });
            case 'exist':
                return wait.forExist({ reverse: !!negation });
            case 'be enabled':
                return wait.forEnabled({ reverse: !!negation });
            default:
                throw new Error(`There is no condition type with ${condition} name.`);
        }
    },
);

Then(
    /^I should wait for '(.*)' attribute text of '(.*)' element (not )?(be|contain) '(.*)'$/,
    async (attributeName: string, query: string, negation: string, condition: TTextCondition, expectedText: string) => {
        let { expect } = PoHandler.init(query).element;

        if (negation) {
            expect = PoHandler.init(query).element.expect.not;
        }

        // todo refactoring is needed. Move this wait into attributeToHaveText
        return PoHandler.init(query).element.wait.until(
            async () => !!(await expect.attributeToHaveText(attributeName, expectedText, condition)),
        );
    },
);
