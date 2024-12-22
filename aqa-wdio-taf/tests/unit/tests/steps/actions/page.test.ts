import { getMatchingDefinition } from '@wdio/cucumber-framework';
import { expect } from '@jest/globals';

import '../../../../../src/steps';
import { initPo } from '../../../../../src/core/po';
import { Page } from '../../../../../src/core/wdio';
import { TStepUsage, testMatchings } from '../helper';
import * as parser from '../../../../../src/core/po/parser';

jest.mock('@wdio/cucumber-framework');
jest.mock('../../../../../src/core/wdio/interaction/page.ts');

const PageMock = Page as jest.MockedClass<typeof Page>;

describe('Steps > actions > page', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();

        jest.spyOn(parser, 'getLocatorByQuery');

        initPo({
            TEST: {
                url: '/',
                selector: 'body',
                name: 'TEST',
                children: {
                    ELEMENT: 'selector',
                },
            },
        });
    });

    describe("I navigate to '(.*)' page", () => {
        const usages: TStepUsage = ["I navigate to 'TEST' page"];

        testMatchings('Given', usages);

        test('call with values', async () => {
            expect.assertions(2);

            await getMatchingDefinition('Given', usages[0]!)('TEST');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page');
            expect(PageMock.mock.instances[0]!.open).toHaveBeenCalledTimes(1);
        });
    });

    describe("I open '(.*)' page in new tab", () => {
        const usages: TStepUsage = ["I open 'TEST' page in new tab"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page');
            expect(PageMock.mock.instances[0]!.openNewWindow).toHaveBeenCalledTimes(1);
        });
    });

    describe("I switch to '(.*)' frame on the page", () => {
        const usages: TStepUsage = ["I switch to 'TEST' frame on the page"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page');
            expect(PageMock.mock.instances[0]!.switchToFrame).toHaveBeenCalledTimes(1);
        });
    });

    describe("I open page by '(.*)' url in new tab", () => {
        const usages: TStepUsage = ["I open page by 'TEST_URL' url in new tab"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[0]!)('TEST_URL');

            expect(browser.newWindow).toHaveBeenCalledWith('TEST_URL');
        });
    });

    describe('I click on browser (back|forward|refresh) button', () => {
        const usages: TStepUsage = [
            'I click on browser back button',
            'I click on browser forward button',
            'I click on browser refresh button',
        ];

        testMatchings('When', usages);

        test('call with "back" value', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[0]!)('back');

            expect(browser.back).toHaveBeenCalledTimes(1);
        });

        test('call with "forward" value', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[1]!)('forward');

            expect(browser.forward).toHaveBeenCalledTimes(1);
        });

        test('call with "refresh" value', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[2]!)('refresh');

            expect(browser.refresh).toHaveBeenCalledTimes(1);
        });
    });

    describe('I switch window to "(.*)"', () => {
        const usages: TStepUsage = ["I switch window to 'TEST_WINDOW'"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[0]!)('TEST_WINDOW');

            expect(browser.switchWindow).toHaveBeenCalledWith('TEST_WINDOW');
        });
    });

    describe('I am on "(.*)" url', () => {
        const usages: TStepUsage = ["I am on 'TEST_URL' url"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[0]!)('TEST_URL');

            expect(browser.url).toHaveBeenCalledWith('TEST_URL');
        });
    });
});
