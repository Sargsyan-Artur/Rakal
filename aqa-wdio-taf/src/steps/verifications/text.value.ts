import { Then } from '@wdio/cucumber-framework';
import { parse } from '@rak-aqa/utils';

import { TTextCondition, TValueCondition } from '../../types';
import { PoHandler } from '../../core/po';

Then(
    /^The '(.*)' element text should (not )?(be|contain|matches) '(.*)'$/,
    async (query: string, negation: string | undefined, condition: TTextCondition, expectedText: string) => {
        let { expect } = PoHandler.init(query).element;
        if (negation) {
            expect = PoHandler.init(query).element.expect.not;
        }
        return expect.textToBe(parse(expectedText), condition);
    },
);

Then(
    /^The all texts of '(.+)' should (not )?(be|contain|matches) '(.*)'$/,
    async (query: string, negotiation: string | undefined, condition: TTextCondition, expectedText: string) => {
        let { expect } = PoHandler.init(query).element;
        if (negotiation) {
            expect = PoHandler.init(query).element.expect.not;
        }
        return expect.allTextsToBe(parse(expectedText), condition);
    },
);

Then(
    /^The value of '(.+)' should (not )?(be|contain|matches) '(.*)'$/,
    async (query: string, negation: string | undefined, condition: TValueCondition, expectedValue: string) => {
        let { expect } = PoHandler.init(query).element;
        if (negation) {
            expect = PoHandler.init(query).element.expect.not;
        }
        return expect.valueToBe(parse<string>(expectedValue), condition);
    },
);
