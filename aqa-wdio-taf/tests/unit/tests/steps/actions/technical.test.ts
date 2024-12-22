import { getMatchingDefinition } from '@wdio/cucumber-framework';
import { expect } from '@jest/globals';

import '../../../../../src/steps';
import { TStepUsage, testMatchings } from '../helper';

jest.mock('webdriverio');
jest.mock('@wdio/cucumber-framework');

describe('Steps > actions > technical', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    describe('I should wait', () => {
        const usages: TStepUsage = ['I should wait 5 seconds'];

        testMatchings('When', usages);

        test('with params', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[0]!)(5);

            expect(browser.pause).toHaveBeenCalledWith(5000);
        });
    });
});
