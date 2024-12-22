import { Then } from '@wdio/cucumber-framework';

import { TElementStateCondition } from '../../types';
import { PoHandler } from '../../core/po';

Then(
    /^The '(.*)' element should (not )?(be displayed|be clickable|exist|be focused|be disabled|be enabled|be selected|be displayed in viewport)$/,
    async (query: string, negation: string | undefined, condition: TElementStateCondition) => {
        let { expect } = PoHandler.init(query).element;
        if (negation) {
            expect = PoHandler.init(query).element.expect.not;
        }

        switch (condition) {
            case 'be displayed':
                return expect.toBeDisplayed();
            case 'be clickable':
                return expect.toBeClickable();
            case 'exist':
                return expect.toExist();
            case 'be focused':
                return expect.toBeFocused();
            case 'be disabled':
                return expect.toBeDisabled();
            case 'be enabled':
                return expect.toBeEnabled();
            case 'be selected':
                return expect.toBeSelected();
            case 'be displayed in viewport':
                return expect.toBeDisplayedInViewport();
            default:
                throw new Error(`There is no condition type with ${condition} name.`);
        }
    },
);
