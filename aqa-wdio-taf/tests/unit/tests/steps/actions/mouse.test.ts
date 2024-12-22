import { getMatchingDefinition } from '@wdio/cucumber-framework';
import { expect } from '@jest/globals';

import '../../../../../src/steps';
import * as parser from '../../../../../src/core/po/parser';
import { initPo } from '../../../../../src/core/po';
import { Element } from '../../../../../src/core/wdio';
import { testMatchings, TStepUsage } from '../helper';
import { EElementType } from '../../../../../src/core/wdio/interaction/enum';

jest.mock('@wdio/cucumber-framework');
jest.mock('../../../../../src/core/wdio/interaction/element.ts');

const ElementMock = Element as jest.MockedClass<typeof Element>;
const getLocatorByQueryMock = parser.getLocatorByQuery as jest.MockedFunction<typeof parser.getLocatorByQuery>;

describe('Steps > actions > mouse', () => {
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
                    'DESTINATION ELEMENT': 'destination selector',
                    COLLECTION: {
                        selector: 'selector',
                        isCollection: true,
                    },
                },
            },
        });
    });

    describe('scroll', () => {
        const usages: TStepUsage = [
            "I scroll to the 'TEST page > ELEMENT' element",
            "I scroll to the 'TEST page > ELEMENT' element with center block",
            "I scroll to the top of the 'TEST' page",
            "I scroll to the bottom of the 'TEST' page",
        ];

        testMatchings('When', usages);

        test('scroll to the element', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.scrollIntoView).toHaveBeenCalledWith({});
        });

        test('scroll to the element with center block', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[1]!)('TEST page > ELEMENT', 'center');

            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.scrollIntoView).toHaveBeenCalledWith({ block: 'center' });
        });

        test('scroll to the page top', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[2]!)('top', 'TEST');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page');
            expect(ElementMock.mock.instances[0]!.scrollIntoView).toHaveBeenCalledWith(true);
        });

        test('scroll to the page bottom', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[3]!)('bottom', 'TEST');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page');
            expect(ElementMock.mock.instances[0]!.scrollIntoView).toHaveBeenCalledWith(false);
        });
    });

    describe("I click on '(.*)' element", () => {
        const usages: TStepUsage = ["I click on 'TEST page > ELEMENT' element"];

        testMatchings('When', usages);

        test('call with a parameter', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.click).toHaveBeenCalledTimes(1);
        });
    });

    describe("I click outside of '(.*)' element(?: with (d+) pixel offset)?", () => {
        const usages: TStepUsage = [
            "I click outside of 'TEST page > ELEMENT' element",
            "I click outside of 'TEST page > ELEMENT' element with 10 pixel offset",
        ];

        testMatchings('When', usages);

        test('call with a parameter (1)', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.click).toHaveBeenNthCalledWith(1, {
                x: -5,
                y: -5,
            });
        });

        test('call with a parameter (2)', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[1]!)('TEST page > ELEMENT', 10);
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.click).toHaveBeenNthCalledWith(1, {
                x: 10,
                y: 10,
            });
        });
    });

    describe("I select '(.*)' element to upload '(.*)' file", () => {
        const usages: TStepUsage = ["I select 'TEST page > ELEMENT' element to upload './testFolder/test.file.json' file"];

        testMatchings('When', usages);

        test('call with parameters', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT', './testFolder/test.file.json');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.uploadFile).toHaveBeenCalledWith('./testFolder/test.file.json');
        });
    });

    describe("I should select '(.*)' element by '(.*)' attribute with '(.*)' value", () => {
        const usages: TStepUsage = ["I should select 'TEST page > ELEMENT' element by 'id' attribute with 'testID' value"];

        testMatchings('When', usages);

        test('call with parameters', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT', 'id', 'testID');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.selectByAttribute).toHaveBeenCalledWith('id', 'testID');
        });
    });

    describe("I move mouse over '(.*)' element", () => {
        const usages: TStepUsage = ["I move mouse over 'TEST page > ELEMENT' element"];

        testMatchings('When', usages);

        test('call with a parameter', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.moveTo).toHaveBeenCalledTimes(1);
        });
    });

    describe("I drag and drop '(.*)' element to (?:(?:'(.*)' element)|(?:'x:(\\d+)' and 'y:(\\d+)' coordinates))", () => {
        const usages: TStepUsage = [
            "I drag and drop 'TEST page > ELEMENT' element to 'TEST page > DESTINATION ELEMENT' element",
            "I drag and drop 'TEST page > ELEMENT' element to 'x:10' and 'y:20' coordinates",
            "I drag and drop 'TEST page > ELEMENT' element to '' element",
        ];

        testMatchings('When', usages);

        test('call with query destination', async () => {
            expect.assertions(6);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT', 'TEST page > DESTINATION ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenNthCalledWith(1, 'TEST page > DESTINATION ELEMENT');
            expect(parser.getLocatorByQuery).toHaveBeenNthCalledWith(2, 'TEST page > ELEMENT');

            const [sourceElement, destinationElement] = (parser.getLocatorByQuery as typeof getLocatorByQueryMock).mock.results;

            expect(ElementMock).toHaveBeenNthCalledWith(1, sourceElement!.value, EElementType.element);
            expect(ElementMock).toHaveBeenNthCalledWith(2, destinationElement!.value, EElementType.element);

            expect(ElementMock.mock.instances[0]!.wdioElement).toHaveBeenCalledWith('one');

            const { value } = ElementMock.prototype.wdioElement.mock.results[0]!;

            expect(ElementMock.mock.instances[1]!.dragAndDrop).toHaveBeenCalledWith(value, { duration: 500 });
        });

        test('call with coordinates', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[1]!)('TEST page > ELEMENT', undefined, 10, 20);
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.dragAndDrop).toHaveBeenCalledWith({ x: 10, y: 20 }, { duration: 500 });
        });

        test('call without query destination', async () => {
            expect.assertions(1);

            await expect(getMatchingDefinition('When', usages[2]!)('TEST page > ELEMENT')).rejects.toThrow(
                'Please specify either "queryDestination" or "x" and "y" coordinates',
            );
        });
    });

    describe("I click on '(.*)' element with text '(.*)'( being case insensitive)?", () => {
        const usages: TStepUsage = [
            "I click on 'TEST page > ELEMENT' element with text 'TEXT'",
            "I click on 'TEST page > ELEMENT' element with text 'TEXT' being case insensitive",
        ];

        testMatchings('When', usages);

        test('call with values', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT', 'TEXT');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.clickText).toHaveBeenCalledWith('TEXT', undefined);
        });

        test('call with being case insensitive', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[1]!)('TEST page > ELEMENT', 'TEXT', ' being case insensitive');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.clickText).toHaveBeenCalledWith('TEXT', ' being case insensitive');
        });
    });

    describe("I click on the (first|last|d+) element of '(.*)' collection", () => {
        const usages: TStepUsage = [
            "I click on the first element of 'TEST page > COLLECTION' collection",
            "I click on the last element of 'TEST page > COLLECTION' collection",
            "I click on the 2 element of 'TEST page > COLLECTION' collection",
        ];

        testMatchings('When', usages);
    });
});
