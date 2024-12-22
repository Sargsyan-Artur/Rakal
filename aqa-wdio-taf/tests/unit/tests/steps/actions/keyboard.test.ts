import { getMatchingDefinition } from '@wdio/cucumber-framework';
import { expect } from '@jest/globals';

import '../../../../../src/steps';
import * as parser from '../../../../../src/core/po/parser';
import * as stringHelper from '../../../../../src/helpers/string';
import { initPo } from '../../../../../src/core/po';
import { Element } from '../../../../../src/core/wdio';
import { TStepUsage, testMatchings } from '../helper';

jest.mock('@wdio/cucumber-framework');
jest.mock('../../../../../src/core/wdio/interaction/element.ts');

const ElementMock = Element as jest.MockedClass<typeof Element>;
const getRandomStringMock = stringHelper.getRandomString as jest.MockedFunction<typeof stringHelper.getRandomString>;

describe('Steps > actions > keyboard', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();

        jest.spyOn(parser, 'getLocatorByQuery');
        jest.spyOn(stringHelper, 'getRandomString');

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

    describe("I type '(.*)' in '(.*)' field", () => {
        const usages: TStepUsage = ["I type 'TEXT' in 'TEST page > ELEMENT' field"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEXT', 'TEST page > ELEMENT');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.setValue).toHaveBeenCalledWith('TEXT');
        });
    });

    describe("I clear value in '(.*)' with keyboard on windows", () => {
        const usages: TStepUsage = [
            "I clear value in 'TEST page > ELEMENT'",
            "I clear value in 'TEST page > ELEMENT' with keyboard on windows",
            "I clear value in 'TEST page > ELEMENT' with keyboard on macos",
        ];

        testMatchings('When', usages);

        test('call with required parameter', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.clearValue).toHaveBeenCalledTimes(1);
        });

        test('call with "on windows" optional parameter', async () => {
            expect.assertions(3);

            await getMatchingDefinition('When', usages[1]!)('TEST page > ELEMENT', ' with keyboard', 'windows');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.clearValueWithKeyboard).toHaveBeenCalledTimes(1);
            expect(ElementMock.mock.instances[0]!.clearValueWithKeyboard).toHaveBeenCalledWith('windows');
        });

        test('call with "on macos" optional parameter', async () => {
            expect.assertions(3);

            await getMatchingDefinition('When', usages[2]!)('TEST page > ELEMENT', ' with keyboard', 'macos');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.clearValueWithKeyboard).toHaveBeenCalledTimes(1);
            expect(ElementMock.mock.instances[0]!.clearValueWithKeyboard).toHaveBeenCalledWith('macos');
        });
    });

    describe("I type '(.*)' in '(.*)' field with existing value", () => {
        const usages: TStepUsage = ["I type 'TEXT' in 'TEST page > ELEMENT' field with existing value"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEXT', 'TEST page > ELEMENT');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.addValue).toHaveBeenCalledWith('TEXT');
        });
    });

    describe("I type random (?:'(d+)' )?(alphabetic|numeric|alphanumeric)(?:s)?values in '(.*)' field", () => {
        const usages: TStepUsage = [
            "I type random '5' values in 'TEST page > ELEMENT' field",
            "I type random values in 'TEST page > ELEMENT' field",
            "I type random alphabetic values in 'TEST page > ELEMENT' field",
            "I type random numeric values in 'TEST page > ELEMENT' field",
            "I type random alphanumeric values in 'TEST page > ELEMENT' field",
            "I type random '7' numeric values in 'TEST page > ELEMENT' field",
        ];

        testMatchings('When', usages);

        test('call with optional & required parameters', async () => {
            expect.assertions(5);

            await getMatchingDefinition('When', usages[0]!)(5, undefined, 'TEST page > ELEMENT');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(stringHelper.getRandomString).toHaveBeenCalledWith(5, undefined);

            const { value } = (stringHelper.getRandomString as typeof getRandomStringMock).mock.results[0]!;

            expect(value).toHaveLength(5);

            expect(stringHelper.getRandomString).toHaveReturnedWith(value);

            expect(ElementMock.mock.instances[0]!.setValue).toHaveBeenCalledWith(value);
        });

        test('call with required parameters', async () => {
            expect.assertions(5);

            await getMatchingDefinition('When', usages[1]!)(undefined, undefined, 'TEST page > ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');

            expect(stringHelper.getRandomString).toHaveBeenCalledWith(undefined, undefined);

            const { value } = (stringHelper.getRandomString as typeof getRandomStringMock).mock.results[0]!;

            expect(value).toHaveLength(10);

            expect(stringHelper.getRandomString).toHaveReturnedWith(value);

            expect(ElementMock.mock.instances[0]!.setValue).toHaveBeenCalledWith(value);
        });

        test('call with optional parameter "alphabetic"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('When', usages[2]!)(undefined, 'alphabetic', 'TEST page > ELEMENT');
            expect(stringHelper.getRandomString).toHaveBeenCalledWith(undefined, 'alphabetic');
        });

        test('call with optional parameter "numeric"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('When', usages[3]!)(undefined, 'numeric', 'TEST page > ELEMENT');
            expect(stringHelper.getRandomString).toHaveBeenCalledWith(undefined, 'numeric');
        });

        test('call with optional parameter "alphanumeric"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('When', usages[4]!)(undefined, 'alphanumeric', 'TEST page > ELEMENT');
            expect(stringHelper.getRandomString).toHaveBeenCalledWith(undefined, 'alphanumeric');
        });

        test('call with optional parameters - number of characters and "numeric"', async () => {
            expect.assertions(5);
            await getMatchingDefinition('When', usages[5]!)(7, 'numeric', 'TEST page > ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(stringHelper.getRandomString).toHaveBeenCalledWith(7, 'numeric');

            const { value } = (stringHelper.getRandomString as typeof getRandomStringMock).mock.results[0]!;

            expect(value).toHaveLength(7);
            expect(stringHelper.getRandomString).toHaveReturnedWith(value);
            expect(ElementMock.mock.instances[0]!.setValue).toHaveBeenCalledWith(value);
        });
    });

    describe("I type '(.*)' text as unique value in '(.*)' field", () => {
        const usages: TStepUsage = ["I type 'TEXT' text as unique value in 'TEST page > ELEMENT' field"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(4);

            await getMatchingDefinition('When', usages[0]!)('TEXT', 'TEST page > ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(stringHelper.getRandomString).toHaveBeenCalledTimes(1);

            const { value } = (stringHelper.getRandomString as typeof getRandomStringMock).mock.results[0]!;

            expect(value).toHaveLength(10);
            expect(ElementMock.mock.instances[0]!.setValue).toHaveBeenCalledWith(`TEXT_${value}`);
        });
    });

    describe("I press '(.*)' on the keyboard while having focus on '(.*)'", () => {
        const usages: TStepUsage = ["I press 'TEXT' on the keyboard while having focus on 'TEST page > ELEMENT'"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEXT', 'TEST page > ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');

            const values = 'TEXT'.split(',').map(value => value.trim());

            expect(ElementMock.mock.instances[0]!.focusAndSendKeys).toHaveBeenCalledWith(values);
        });
    });

    describe("I press '(.*)' on the keyboard '(\\d+)' times", () => {
        const usages: TStepUsage = ["I press 'TEXT' on the keyboard '5' times"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEXT', 5);

            const values = 'TEXT'.split(',').map(value => value.trim());

            expect(browser.keys).toHaveBeenCalledWith(values);
            expect(browser.keys).toHaveBeenCalledTimes(5);
        });
    });

    describe("I press '(.*)' on the keyboard", () => {
        const usages: TStepUsage = ["I press 'TEXT' on the keyboard"];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[0]!)('TEXT');

            const values = 'TEXT'.split(',').map(value => value.trim());

            expect(browser.keys).toHaveBeenCalledWith(values);
        });
    });
});
