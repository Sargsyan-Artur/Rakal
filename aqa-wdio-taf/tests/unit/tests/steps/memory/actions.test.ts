import { expect } from '@jest/globals';
import { getMatchingDefinition } from '@wdio/cucumber-framework';
import { memory } from '@rak-aqa/utils';

import '../../../../../src/steps';
import { TStepUsage, testMatchings } from '../helper';
import * as parser from '../../../../../src/core/po/parser';
import { initPo } from '../../../../../src/core/po';
import { Element } from '../../../../../src/core/wdio';

const ElementMock = Element as jest.MockedClass<typeof Element>;

jest.mock('log4js');
jest.mock('@wdio/cucumber-framework');
jest.mock('@rak-aqa/utils');
jest.mock('../../../../../src/core/wdio/interaction/element.ts');

describe('Steps > memory > actions', () => {
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
                    ELEMENT_COLLECTION: {
                        isCollection: true,
                        selector: 'collection selector',
                    },
                },
            },
        });
    });

    describe(`I remember the text of '(.+)' as '(.+)'`, () => {
        const usages: TStepUsage = ["I remember the text of 'TEST page > ELEMENT' as 'pageTitle'"];

        testMatchings('When', usages);

        test('call with value', async () => {
            expect.assertions(3);

            ElementMock.prototype.getText.mockReturnValue(Promise.resolve('unit test save text'));
            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT', 'pageTitle');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.getText).toHaveBeenCalledTimes(1);

            expect(memory.set).toHaveBeenCalledWith('pageTitle', 'unit test save text');
        });
    });

    describe(`I remember the value of '(.+)' as '(.+)'`, () => {
        const usages: TStepUsage = ["I remember the value of 'TEST page > ELEMENT' as 'elementValue'"];

        testMatchings('When', usages);

        test('call with value', async () => {
            expect.assertions(3);

            ElementMock.prototype.getValue.mockReturnValue(Promise.resolve('unit test save value'));
            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT', 'elementValue');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.getValue).toHaveBeenCalledTimes(1);

            expect(memory.set).toHaveBeenCalledWith('elementValue', 'unit test save value');
        });
    });

    describe(`I remember the '(.+)' attribute of '(.+)' as '(.+)'`, () => {
        const usages: TStepUsage = ["I remember the 'background' attribute of 'TEST page > ELEMENT' as 'attributeValue'"];

        testMatchings('When', usages);

        test('call with value', async () => {
            expect.assertions(4);

            ElementMock.prototype.getAttributeText.mockReturnValue(Promise.resolve('unit test save attribute'));
            await getMatchingDefinition('When', usages[0]!)('background', 'TEST page > ELEMENT', 'attributeValue');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.getAttributeText).toHaveBeenCalledWith('background');
            expect(ElementMock.mock.instances[0]!.getAttributeText).toHaveBeenCalledTimes(1);

            expect(memory.set).toHaveBeenCalledWith('attributeValue', 'unit test save attribute');
        });
    });

    describe(`I remember the number of '(.+)' as '(.+)'`, () => {
        const usages: TStepUsage = ["I remember the number of 'TEST page > ELEMENT' as 'numberOfElements'"];

        testMatchings('When', usages);

        test('call with 1 element', async () => {
            expect.assertions(3);

            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT', 'numberOfElements');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.wdioElement).toHaveBeenCalledTimes(1);

            expect(memory.set).toHaveBeenCalledWith('numberOfElements', 1);
        });
    });

    describe(`I remember the '(.+)' CSS property value of '(.+)' as '(.+)'`, () => {
        const usages: TStepUsage = ["I remember the 'background-color' CSS property value of 'TEST page > ELEMENT' as 'cssPropertyValue'"];

        testMatchings('When', usages);

        test('call with value', async () => {
            expect.assertions(3);

            ElementMock.prototype.getCSSPropertyValue.mockReturnValue(Promise.resolve({ value: '#000', parsed: {} }));
            await getMatchingDefinition('When', usages[0]!)('background-color', 'TEST page > ELEMENT', 'cssPropertyValue');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT');
            expect(ElementMock.mock.instances[0]!.getCSSPropertyValue).toHaveBeenCalledWith('background-color');

            expect(memory.set).toHaveBeenCalledWith('cssPropertyValue', '#000');
        });
    });

    describe(`I remember the order of '(.+)' as '(.+)'`, () => {
        const usages: TStepUsage = ["I remember the order of 'TEST page > ELEMENT_COLLECTION' as 'orderValue'"];

        testMatchings('When', usages);

        test('call with one value', async () => {
            expect.assertions(3);

            ElementMock.prototype.getText.mockReturnValue(Promise.resolve('unit test value'));
            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT_COLLECTION', 'orderValue_1');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT_COLLECTION');
            expect(ElementMock.mock.instances[0]!.getText).toHaveBeenCalledTimes(1);

            expect(memory.set).toHaveBeenCalledWith('orderValue_1', ['unit test value']);
        });

        test('call with multiple values', async () => {
            expect.assertions(3);

            const arrayOfValues = ['unit test v1', 'unit test v2', 'unit test v3'];
            ElementMock.prototype.getText.mockReturnValue(Promise.resolve(arrayOfValues));
            await getMatchingDefinition('When', usages[0]!)('TEST page > ELEMENT_COLLECTION', 'orderValue_2');
            expect(parser.getLocatorByQuery).toHaveBeenCalledWith('TEST page > ELEMENT_COLLECTION');
            expect(ElementMock.mock.instances[0]!.getText).toHaveBeenCalledTimes(1);

            expect(memory.set).toHaveBeenCalledWith('orderValue_2', arrayOfValues);
        });
    });

    describe(`I delete '(.+)' from memory`, () => {
        const usages: TStepUsage = ["I delete 'pageUrl' from memory"];

        testMatchings('When', usages);

        test('delete method was called', async () => {
            expect.assertions(1);

            memory.set('pageUrl', 'unit test value');
            await getMatchingDefinition('When', usages[0]!)('pageUrl');
            expect(memory.delete).toHaveBeenCalledWith('pageUrl');
        });
    });

    describe(`I clear memory`, () => {
        const usages: TStepUsage = ['I clear memory'];

        testMatchings('When', usages);

        test('clear method was called', async () => {
            expect.assertions(1);

            await getMatchingDefinition('When', usages[0]!)();
            expect(memory.clear).toHaveBeenCalledTimes(1);
        });
    });

    describe("I remember the text of the (first|last|d+) element of '(.*)' collection as '(.*)'", () => {
        const usages: TStepUsage = [
            "I remember the text of the first element of 'TEST page > ELEMENT_COLLECTION' collection as 'elementText'",
            "I remember the text of the last element of 'TEST page > ELEMENT_COLLECTION' collection as 'elementText'",
            "I remember the text of the 2 element of 'TEST page > ELEMENT_COLLECTION' collection as 'elementText'",
        ];
        testMatchings('When', usages);
    });

    describe("I remember random (?:'(\\d+)' )?(alphabetic|numeric|alphanumeric)? values as '(.+)'", () => {
        const usages: TStepUsage = [
            "I remember random '150' values as 'keyName'",
            "I remember random '150' alphabetic values as 'keyName'",
            "I remember random '150' numeric values as 'keyName'",
            "I remember random '150' alphanumeric values as 'keyName'",
        ];
        testMatchings('When', usages);

        test('memory.set was called', async () => {
            expect.assertions(2);

            await getMatchingDefinition('When', usages[0]!)('150', undefined, 'keyName');
            await getMatchingDefinition('When', usages[1]!)('150', 'alphabetic', 'keyName');
            await getMatchingDefinition('When', usages[2]!)('150', 'numeric', 'keyName');
            await getMatchingDefinition('When', usages[3]!)('150', 'alphanumeric', 'keyName');

            expect(memory.set).toHaveBeenCalledTimes(4);
            expect(memory.set).toHaveBeenCalledWith('keyName', expect.any(String));
        });
    });
});
