import { Then } from '@wdio/cucumber-framework';

import { TCountRange, TRangeOptions } from '../../types';
import { PoHandler } from '../../core/po';

Then(
    // eslint-disable-next-line no-useless-escape
    /^The value of '(.*)' should (be in range) '([\(,\[]\d+(\.?\d+)?\,\s?\d+(\.?\d+)?[\)\]])'$/,
    async (query: string, condition: TCountRange, range: TRangeOptions) => {
        const { expect } = PoHandler.init(query).element;

        switch (condition) {
            case 'be in range':
                return expect.toBeInRange(range);
            default:
                throw new Error('Please enter correct Condition Type');
        }
    },
);

Then(
    /^The length of value in '(.*)' (?:input|text area) should be equal to '(.*)' characters$/,
    async (query: string, characters: number) => {
        return PoHandler.init(query).element.expect.contentLengthToBe({ characters, type: 'value' });
    },
);

Then(/^The length of text in '(.*)' element should be equal to '(.*)' characters$/, async (query: string, characters: number) => {
    return PoHandler.init(query).element.expect.contentLengthToBe({ characters });
});
