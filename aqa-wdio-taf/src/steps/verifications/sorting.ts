import { Then } from '@wdio/cucumber-framework';
import { parse } from '@rak-aqa/utils';
import { expect as chaiExpect } from 'chai';
import { TSortingOrder, TSortingType } from '../../types';
import { PoHandler } from '../../core/po';

Then(
    /^The '(.*)' element of the '(.*)' array should be after '(.*)' element in the '(.*)' array$/,
    (initialOrderIndex: number, initialOrder: string, afterReorderIndex: number, stateAfterReorder: string) => {
        const initialOrderArray = parse<string[]>(initialOrder);
        const stateAfterReorderArray = parse<string[]>(stateAfterReorder);
        const newIndexAfterReordering = stateAfterReorderArray.findIndex(item => item === initialOrderArray[Number(initialOrderIndex)]);
        return chaiExpect(newIndexAfterReordering).to.be.above(Number(afterReorderIndex));
    },
);

Then(
    /^The '(.*)' elements are sorted in (asc|desc) order by (numbers|letters)$/,
    async (query: string, order: TSortingOrder, type: TSortingType) => {
        return PoHandler.init(query).element.expect.sortedBy(order, type);
    },
);
