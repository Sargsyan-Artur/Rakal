import { countMatchingDefinition } from '@wdio/cucumber-framework';
import { expect } from '@jest/globals';

jest.mock('@wdio/cucumber-framework');

// eslint-disable-next-line jest/no-export
export type TStepUsage = string[];

// eslint-disable-next-line jest/no-export
export const testMatchings = (type: 'Given' | 'When' | 'Then', usages: TStepUsage): void => {
    usages.forEach((usage: string): void => {
        // eslint-disable-next-line jest/require-top-level-describe
        test(`should have step to match [${usage}]`, () => {
            expect.assertions(1);

            expect(countMatchingDefinition(type, usage)).toBe(1);
        });
    });
};
