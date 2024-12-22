import { Then } from '@wdio/cucumber-framework';
import { parse } from '@rak-aqa/utils';

import { TCountCondition, TRangeOptions } from '../../types';
import { PoHandler } from '../../core/po';

Then(
    /^The count of '(.*)' should (be equal|not be|be more than|be less than) '(\d+|#\$\$?[a-zA-Z]+)'$/,
    async (query: string, condition: TCountCondition, count: string) => {
        const { expect } = PoHandler.init(query).element;
        const expectedCount = parseInt(parse<string>(count), 10);

        switch (condition) {
            case 'be equal':
                return expect.toBeElementsArrayOfSize(expectedCount);
            case 'not be':
                return expect.not.toBeElementsArrayOfSize(expectedCount);
            case 'be more than':
                return expect.toBeElementsArrayOfSize({ gte: expectedCount });
            case 'be less than':
                return expect.toBeElementsArrayOfSize({ lte: expectedCount });
            default:
                throw new Error('Please enter correct Condition Type');
        }
    },
);

Then(
    // eslint-disable-next-line no-useless-escape
    /^The count of '(.+)' should (not )?be in range '([\(,\[]\d+\,\s?\d+[\)\]])'$/,
    async (query: string, negotiation: string | undefined, range: TRangeOptions) => {
        let { expect } = PoHandler.init(query).element;
        if (negotiation) {
            expect = PoHandler.init(query).element.expect.not;
        }
        return expect.toHaveLengthInRange(range);
    },
);
