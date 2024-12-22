import { Then } from '@wdio/cucumber-framework';
import { parse } from '@rak-aqa/utils';

import { TTextCondition } from '../../types';
import { PoHandler } from '../../core/po';

Then(
    /^The '(.*)' CSS property of '(.*)' element should (not )?(be|contain) '(.*)'$/,
    async (property: string, query: string, negation: string | undefined, condition: TTextCondition, value: string) => {
        let { expect } = PoHandler.init(query).element;
        if (negation) {
            expect = PoHandler.init(query).element.expect.not;
        }

        return expect.CSSPropertyToBe(property, parse<string>(value), condition);
    },
);

Then(
    /^The '(.*)' attribute text of '(.*)' element should (not )?(be|contain) '(.*)'$/,
    async (attributeName: string, query: string, negation: string, condition: TTextCondition, expectedText: string) => {
        let { expect } = PoHandler.init(query).element;
        if (negation) {
            expect = PoHandler.init(query).element.expect.not;
        }
        return expect.attributeToHaveText(attributeName, parse<string>(expectedText), condition);
    },
);
