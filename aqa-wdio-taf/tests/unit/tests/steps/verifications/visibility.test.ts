import { getMatchingDefinition } from '@wdio/cucumber-framework';
import { expect } from '@jest/globals';

import { TStepUsage } from '../helper';
import { initPo } from '../../../../../src/core/po';
import '../../../../../src/steps';
import * as parser from '../../../../../src/core/po/parser';
import { ElementExpects, ElementWaits } from '../../../../../src/core/wdio';

jest.mock('@wdio/logger');
jest.mock('@wdio/cucumber-framework');
jest.mock('../../../../../src/core/wdio/waits/element.waits.ts');
jest.mock('../../../../../src/core/wdio/waits/page.waits.ts');
jest.mock('../../../../../src/core/wdio/expects/element.expects.ts');
jest.mock('../../../../../src/core/wdio/expects/page.expects');

const ElementExpectsMock = ElementExpects as jest.MockedClass<typeof ElementExpects>;
const ElementWaitMock = ElementWaits as jest.MockedClass<typeof ElementWaits>;

describe('Steps > verifications > visibility', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(parser, 'getLocatorByQuery');

        initPo({
            Base: {
                url: '/',
                selector: 'body',
                name: 'Base',
                children: {
                    Menu: {
                        selector: 'selector',
                        children: {
                            Items: 'selector',
                        },
                    },
                },
            },
        });
    });

    describe("The count of '(.*)' should (be equal|not be|be more than|be less than) '(.*)'", () => {
        const usages: TStepUsage = [
            "The count of 'Base page > Menu > Items' should be equal '5'",
            "The count of 'Base page > Menu > Items' should be more than '5'",
            "The count of 'Base page > Menu > Items' should be less than '5'",
        ];

        test('call with values "be equal"', async () => {
            expect.assertions(2);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', 'be equal', '5');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('Base page > Menu > Items');
            expect(ElementExpectsMock.mock.instances[0]!.toBeElementsArrayOfSize).toHaveBeenCalledWith(5);
        });

        test('call with values "be more than"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[1]!)('Base page > Menu > Items', 'be more than', '5');

            expect(ElementExpectsMock.mock.instances[0]!.toBeElementsArrayOfSize).toHaveBeenCalledWith({ gte: 5 });
        });

        test('call with values "be less than"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[2]!)('Base page > Menu > Items', 'be less than', '5');

            expect(ElementExpectsMock.mock.instances[0]!.toBeElementsArrayOfSize).toHaveBeenCalledWith({ lte: 5 });
        });
    });

    describe("The '(.*)' element text should (not )?(be|contain|matches) '(.*)'", () => {
        const usages: TStepUsage = [
            "The 'Base page > Menu > Items' element text should be 'test'",
            "The 'Base page > Menu > Items' element text should contain 'test'",
            "The 'Base page > Menu > Items' element text should matches 'w+/gmi'",
        ];

        test('call with value "be"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', undefined, 'be', 'test');

            expect(ElementExpectsMock.mock.instances[0]!.textToBe).toHaveBeenCalledWith('test', 'be');
        });

        test('call with value "contain"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', undefined, 'contain', 'test');

            expect(ElementExpectsMock.mock.instances[0]!.textToBe).toHaveBeenCalledWith('test', 'contain');
        });

        test('call with value "matches"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', undefined, 'matches', 'w+/gmi');

            expect(ElementExpectsMock.mock.instances[0]!.textToBe).toHaveBeenCalledWith('w+/gmi', 'matches');
        });
    });

    describe("The '(.*)' element should (not )?(be displayed|be clickable|exist|be focused|be disabled|be enabled|be selected|be displayed in viewport)", () => {
        const usages: TStepUsage = [
            "The 'Base page > Menu > Items' element should be displayed",
            "The 'Base page > Menu > Items' element should be clickable",
            "The 'Base page > Menu > Items' element should exist",
            "The 'Base page > Menu > Items' element should be focused",
            "The 'Base page > Menu > Items' element should be disabled",
            "The 'Base page > Menu > Items' element should be enabled",
            "The 'Base page > Menu > Items' element should be selected",
            "The 'Base page > Menu > Items' element should be displayed in viewport",
        ];

        test('call with value "be displayed"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', undefined, 'be displayed');

            expect(ElementExpectsMock.mock.instances[0]!.toBeDisplayed).toHaveBeenCalledTimes(1);
        });

        test('call with value "be clickable"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[1]!)('Base page > Menu > Items', undefined, 'be clickable');

            expect(ElementExpectsMock.mock.instances[0]!.toBeClickable).toHaveBeenCalledTimes(1);
        });

        test('call with value "exist"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[2]!)('Base page > Menu > Items', undefined, 'exist');

            expect(ElementExpectsMock.mock.instances[0]!.toExist).toHaveBeenCalledTimes(1);
        });

        test('call with value "be focused"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[3]!)('Base page > Menu > Items', undefined, 'be focused');

            expect(ElementExpectsMock.mock.instances[0]!.toBeFocused).toHaveBeenCalledTimes(1);
        });

        test('call with value "be disabled"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[4]!)('Base page > Menu > Items', undefined, 'be disabled');

            expect(ElementExpectsMock.mock.instances[0]!.toBeDisabled).toHaveBeenCalledTimes(1);
        });

        test('call with value "be enabled"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[5]!)('Base page > Menu > Items', undefined, 'be enabled');

            expect(ElementExpectsMock.mock.instances[0]!.toBeEnabled).toHaveBeenCalledTimes(1);
        });

        test('call with value "be selected"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[6]!)('Base page > Menu > Items', undefined, 'be selected');

            expect(ElementExpectsMock.mock.instances[0]!.toBeSelected).toHaveBeenCalledTimes(1);
        });

        test('call with value "be displayed in viewport"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[7]!)('Base page > Menu > Items', undefined, 'be displayed in viewport');

            expect(ElementExpectsMock.mock.instances[0]!.toBeDisplayedInViewport).toHaveBeenCalledTimes(1);
        });
    });

    describe("The '(.*)' attribute text of '(.*)' element should (not )?(be|contain) '(.*)'", () => {
        const usages: TStepUsage = [
            "The 'name' attribute text of 'Base page > Menu > Items' element should be 'text'",
            "The 'name' attribute text of 'Base page > Menu > Items' element should contain 'text'",
        ];

        test('call with values "name, be , text"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('name', 'Base page > Menu > Items', undefined, 'be', 'text');

            expect(ElementExpectsMock.mock.instances[0]!.attributeToHaveText).toHaveBeenCalledWith('name', 'text', 'be');
        });

        test('call with values "name, not, contain, text"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[1]!)('name', 'Base page > Menu > Items', undefined, 'contain', 'text');

            expect(ElementExpectsMock.mock.instances[0]!.attributeToHaveText).toHaveBeenCalledWith('name', 'text', 'contain');
        });
    });

    describe("The length of value in '(.*)' (?:input|text area) should be equal to '(.*)' characters", () => {
        const usages: TStepUsage = ["The length of value in 'Base page > Menu > Items' input should be equal to '5' characters"];

        test('call with values "name, be , text"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', 5);

            expect(ElementExpectsMock.mock.instances[0]!.contentLengthToBe).toHaveBeenCalledWith({
                characters: 5,
                type: 'value',
            });
        });
    });

    describe("The length of text in '(.*)' element should be equal to '(.*)' characters", () => {
        const usages: TStepUsage = ["The length of text in 'Base page > Menu > Items' element should be equal to '5' characters"];

        test('call with values "name, be , text"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', 5);

            expect(ElementExpectsMock.mock.instances[0]!.contentLengthToBe).toHaveBeenCalledWith({ characters: 5 });
        });
    });

    describe("The value of '(.+)' should (not )?(be|contain|matches) '(.*)'", () => {
        const usages: TStepUsage = [
            "The value of 'Base page > Menu > Items' should be 'text'",
            "The value of 'Base page > Menu > Items' should contain 'text'",
            "The value of 'Base page > Menu > Items' should matches 'w+/gmi'",
        ];

        test('call with values "be , text"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', undefined, 'be', 'text');

            expect(ElementExpectsMock.mock.instances[0]!.valueToBe).toHaveBeenCalledWith('text', 'be');
        });

        test('call with values "contain , text"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[1]!)('Base page > Menu > Items', undefined, 'contain', 'text');

            expect(ElementExpectsMock.mock.instances[0]!.valueToBe).toHaveBeenCalledWith('text', 'contain');
        });

        test('call with values "matches , w+/gmi"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[2]!)('Base page > Menu > Items', undefined, 'matches', 'w+/gmi');

            expect(ElementExpectsMock.mock.instances[0]!.valueToBe).toHaveBeenCalledWith('w+/gmi', 'matches');
        });
    });

    describe("I should wait for '(.*)' element (not )?(be displayed|be clickable|exist|be enabled)", () => {
        const usages: TStepUsage = [
            "I should wait for 'Base page > Menu > Items' element be displayed",
            "I should wait for 'Base page > Menu > Items' element be clickable",
            "I should wait for 'Base page > Menu > Items' element exist",
            "I should wait for 'Base page > Menu > Items' element be enabled",
            "I should wait for 'Base page > Menu > Items' element not be enabled",
        ];

        test('call with values "be displayed"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', undefined, 'be displayed');

            expect(ElementWaitMock.mock.instances[0]!.forDisplayed).toHaveBeenCalledWith({ reverse: false });
        });

        test('call with values "be clickable"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[1]!)('Base page > Menu > Items', undefined, 'be clickable');

            expect(ElementWaitMock.mock.instances[0]!.forClickable).toHaveBeenCalledWith({ reverse: false });
        });

        test('call with values "exist"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[2]!)('Base page > Menu > Items', undefined, 'exist');

            expect(ElementWaitMock.mock.instances[0]!.forExist).toHaveBeenCalledWith({ reverse: false });
        });

        test('call with values "be enabled"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[3]!)('Base page > Menu > Items', undefined, 'be enabled');

            expect(ElementWaitMock.mock.instances[0]!.forEnabled).toHaveBeenCalledWith({ reverse: false });
        });

        test('call with values "not be enabled"', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[4]!)('Base page > Menu > Items', 'not', 'be enabled');

            expect(ElementWaitMock.mock.instances[0]!.forEnabled).toHaveBeenCalledWith({ reverse: true });
        });
    });

    // describe block below is skipped due to problems with 'memory' mock
    describe.skip("The '(.*)' element of the '(.*)' array should be after '(.*)' element in the '(.*)' array", () => {
        const usages: TStepUsage = [
            "The '1' element of the '#$initialOrder' array should be after '2' element in the '#$stateAfterReorder' array",
        ];

        test('call with parameters', async () => {
            expect.assertions(1);
            await getMatchingDefinition('Then', usages[0]!)('1', '#$initialOrder', '2', '#$stateAfterReorder');
        });
    });

    // TODO Add tests for "not" option
    describe("The count of '(.+)' should (not )?be in range '([\\(,\\[]\\d+\\,\\s?\\d+[\\)\\]])'", () => {
        const usages: TStepUsage = ["The count of 'Base page > Menu > Items' should be in range '[1, 10]'"];

        test('call with values "[1, 10]"', async () => {
            expect.assertions(2);

            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', undefined, '[1, 10]');

            expect(ElementExpectsMock.mock.instances[0]!.toHaveLengthInRange).toHaveBeenCalledTimes(1);
            expect(ElementExpectsMock.mock.instances[0]!.toHaveLengthInRange).toHaveBeenCalledWith('[1, 10]');
        });
    });

    describe("The all texts of '(.+)' should (not )?(be|contain) '(.*)'", () => {
        const usages: TStepUsage = [
            "The all texts of 'Base page > Menu > Items' should be 'test'",
            "The all texts of 'Base page > Menu > Items' should contain 'test'",
            "The all texts of 'Base page > Menu > Items' should matches 'test'",
        ];

        test('call with values "be, test"', async () => {
            expect.assertions(2);

            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', undefined, 'be', 'test');

            expect(ElementExpectsMock.mock.instances[0]!.allTextsToBe).toHaveBeenCalledTimes(1);
            expect(ElementExpectsMock.mock.instances[0]!.allTextsToBe).toHaveBeenCalledWith('test', 'be');
        });

        test('call with values "contain, test"', async () => {
            expect.assertions(2);

            await getMatchingDefinition('Then', usages[1]!)('Base page > Menu > Items', undefined, 'contain', 'test');

            expect(ElementExpectsMock.mock.instances[0]!.allTextsToBe).toHaveBeenCalledTimes(1);
            expect(ElementExpectsMock.mock.instances[0]!.allTextsToBe).toHaveBeenCalledWith('test', 'contain');
        });

        test('call with values "matches, test"', async () => {
            expect.assertions(2);

            await getMatchingDefinition('Then', usages[2]!)('Base page > Menu > Items', undefined, 'matches', 'test');

            expect(ElementExpectsMock.mock.instances[0]!.allTextsToBe).toHaveBeenCalledTimes(1);
            expect(ElementExpectsMock.mock.instances[0]!.allTextsToBe).toHaveBeenCalledWith('test', 'matches');
        });
    });

    describe("The '(.*)' CSS property of '(.*)' element should (not )?(be|contain) '(.*)'", () => {
        const usages: TStepUsage = [
            "The 'background-color' CSS property of 'Base page > Menu > 1st Items' element should be '#000'",
            "The 'background-color' CSS property of 'Base page > Menu > 1st Items' element should contain '#000'",
        ];

        test('call with values "be, #000"', async () => {
            expect.assertions(2);

            await getMatchingDefinition('Then', usages[0]!)('background-color', 'Base page > Menu > 1st Items', undefined, 'be', '#000');

            expect(ElementExpectsMock.mock.instances[0]!.CSSPropertyToBe).toHaveBeenCalledTimes(1);
            expect(ElementExpectsMock.mock.instances[0]!.CSSPropertyToBe).toHaveBeenCalledWith('background-color', '#000', 'be');
        });

        test('call with values "contain, #000"', async () => {
            expect.assertions(2);

            await getMatchingDefinition('Then', usages[1]!)(
                'background-color',
                'Base page > Menu > 1st Items',
                undefined,
                'contain',
                '#000',
            );

            expect(ElementExpectsMock.mock.instances[0]!.CSSPropertyToBe).toHaveBeenCalledTimes(1);
            expect(ElementExpectsMock.mock.instances[0]!.CSSPropertyToBe).toHaveBeenCalledWith('background-color', '#000', 'contain');
        });
    });

    describe("The value of '(.*)' should (be in range) '([\\(,\\[]\\d+(\\.?\\d+)?\\,\\s?\\d+(\\.?\\d+)?[\\)\\]])'", () => {
        const usages: TStepUsage = ["The value of 'Base page > Menu > 1st Items' should be in range '[1, 10]'"];

        test('call with value "be in range"', async () => {
            expect.assertions(2);

            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > 1st Items', 'be in range', '[1, 10]');

            expect(ElementExpectsMock.mock.instances[0]!.toBeInRange).toHaveBeenCalledTimes(1);
            expect(ElementExpectsMock.mock.instances[0]!.toBeInRange).toHaveBeenCalledWith('[1, 10]');
        });
    });

    describe("The '(.*)' elements are sorted in (asc|desc) order by (numbers|letters)", () => {
        const usages: TStepUsage = [
            "The 'Base page > Menu > Items' elements are sorted in asc order by numbers",
            "The 'Base page > Menu > Items' elements are sorted in asc order by letters",
            "The 'Base page > Menu > Items' elements are sorted in desc order by numbers",
            "The 'Base page > Menu > Items' elements are sorted in desc order by letters",
        ];

        test('call with values "asc, numbers"', async () => {
            expect.assertions(2);
            await getMatchingDefinition('Then', usages[0]!)('Base page > Menu > Items', 'asc ', 'numbers');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('Base page > Menu > Items');
            expect(ElementExpectsMock.mock.instances[0]!.sortedBy).toHaveBeenCalledWith('asc ', 'numbers');
        });

        test('call with values "asc, letters"', async () => {
            expect.assertions(2);
            await getMatchingDefinition('Then', usages[1]!)('Base page > Menu > Items', 'asc ', 'letters');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('Base page > Menu > Items');
            expect(ElementExpectsMock.mock.instances[0]!.sortedBy).toHaveBeenCalledWith('asc ', 'letters');
        });

        test('call with values "desc, numbers"', async () => {
            expect.assertions(2);
            await getMatchingDefinition('Then', usages[2]!)('Base page > Menu > Items', 'desc ', 'numbers');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('Base page > Menu > Items');
            expect(ElementExpectsMock.mock.instances[0]!.sortedBy).toHaveBeenCalledWith('desc ', 'numbers');
        });

        test('call with values "desc, letters"', async () => {
            expect.assertions(2);
            await getMatchingDefinition('Then', usages[3]!)('Base page > Menu > Items', 'desc ', 'letters');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('Base page > Menu > Items');
            expect(ElementExpectsMock.mock.instances[0]!.sortedBy).toHaveBeenCalledWith('desc ', 'letters');
        });
    });
});
