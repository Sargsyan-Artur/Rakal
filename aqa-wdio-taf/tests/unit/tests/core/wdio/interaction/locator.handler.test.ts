import { expect } from '@jest/globals';

import { LocatorHandler } from '../../../../../../src/core/wdio';
import { EElementType } from '../../../../../../src/core/wdio/interaction/enum';
import { TLocator } from '../../../../../../src/types';

jest.mock('@wdio/logger');
jest.mock('webdriverio');

const $Mock = $ as jest.MockedFunction<typeof $>;
const $$Mock = $$ as jest.MockedFunction<typeof $$>;

describe('core > wdio > interaction > locator.handler', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
        jest.clearAllMocks();
    });

    test("getElement('one'). EElementType.element. $.$$[1].$$[0].$", async () => {
        expect.assertions(5);

        const locator: TLocator = {
            element: [
                {
                    selector: 'app-root',
                },
                {
                    selector: 'collection with index',
                    isCollection: true,
                    index: 1,
                },
                {
                    selector: 'collection without index',
                    isCollection: true,
                },
                'single-final',
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement('one');
        await locatorHandler.getElement('one'); // in order to check cache reset

        expect($).toHaveBeenCalledWith('app-root');

        expect($Mock.mock.results[0]!.value.$$).toHaveBeenCalledWith('collection with index');

        expect($Mock.mock.results[0]!.value.$$.mock.results[0]!.value[1].$$).toHaveBeenCalledWith('collection without index');

        expect($Mock.mock.results[0]!.value.$$.mock.results[0]!.value[1].$$.mock.results[0]!.value[0].$).toHaveBeenCalledWith(
            'single-final',
        );
        expect($Mock.mock.results[0]!.value.$$.mock.results[0]!.value[1].$$.mock.results[0]!.value[0].$).toHaveReturnedWith(
            '$.$$[1].$$[0].$',
        );
    });

    test("getElement('one'). EElementType.element. $.$.$.$$", async () => {
        expect.assertions(5);

        const locator: TLocator = {
            element: [
                {
                    selector: 'app-root',
                },
                'second-selector',
                'third-selector',
                {
                    selector: 'collection without index',
                    isCollection: true,
                },
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement('one');

        expect($).toHaveBeenCalledWith('app-root');

        expect($Mock.mock.results[0]!.value.$).toHaveBeenCalledWith('second-selector');

        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$).toHaveBeenCalledWith('third-selector');

        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$.mock.results[0]!.value.$$).toHaveBeenCalledWith(
            'collection without index',
        );
        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$.mock.results[0]!.value.$$).toHaveReturnedWith(['$.$.$.$$']);
    });

    test("getElement('one'). EElementType.element. $.$.$.$$[0]", async () => {
        expect.assertions(5);

        const locator: TLocator = {
            element: [
                {
                    selector: 'app-root',
                },
                'second-selector',
                'third-selector',
                {
                    selector: 'collection with index',
                    isCollection: true,
                    index: 0,
                },
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement('one');

        expect($).toHaveBeenCalledWith('app-root');

        expect($Mock.mock.results[0]!.value.$).toHaveBeenCalledWith('second-selector');

        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$).toHaveBeenCalledWith('third-selector');

        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$.mock.results[0]!.value.$$).toHaveBeenCalledWith(
            'collection with index',
        );
        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$.mock.results[0]!.value.$$).toHaveReturnedWith(['$.$.$.$$']);
    });

    test('getElement(). EElementType.element. $.$$[1].$$[0].$', async () => {
        expect.assertions(5);

        const locator: TLocator = {
            element: [
                {
                    selector: 'app-root',
                },
                {
                    selector: 'collection with index',
                    isCollection: true,
                    index: 1,
                },
                {
                    selector: 'collection without index',
                    isCollection: true,
                },
                'single-final',
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement();

        expect($).toHaveBeenCalledWith('app-root');

        expect($Mock.mock.results[0]!.value.$$).toHaveBeenCalledWith('collection with index');

        expect($Mock.mock.results[0]!.value.$$.mock.results[0]!.value[1].$$).toHaveBeenCalledWith('collection without index');

        expect($Mock.mock.results[0]!.value.$$.mock.results[0]!.value[1].$$.mock.results[0]!.value[0].$).toHaveBeenCalledWith(
            'single-final',
        );
        expect($Mock.mock.results[0]!.value.$$.mock.results[0]!.value[1].$$.mock.results[0]!.value[0].$).toHaveReturnedWith(
            '$.$$[1].$$[0].$',
        );
    });

    test('getElement(). EElementType.element. $$[0].$$[1].$$[0].$', async () => {
        expect.assertions(5);

        const locator: TLocator = {
            element: [
                {
                    selector: 'first collection with index',
                    isCollection: true,
                    index: 0,
                },
                {
                    selector: 'second collection with index',
                    isCollection: true,
                    index: 1,
                },
                {
                    selector: 'third collection without index',
                    isCollection: true,
                },
                'single-final-selector',
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement();

        expect($$).toHaveBeenCalledWith('first collection with index');

        expect($$Mock.mock.results[0]!.value[0].$$).toHaveBeenCalledWith('second collection with index');

        expect($$Mock.mock.results[0]!.value[0].$$.mock.results[0]!.value[1].$$).toHaveBeenCalledWith('third collection without index');

        expect($$Mock.mock.results[0]!.value[0].$$.mock.results[0]!.value[1].$$.mock.results[0]!.value[0].$).toHaveBeenCalledWith(
            'single-final-selector',
        );
        expect($$Mock.mock.results[0]!.value[0].$$.mock.results[0]!.value[1].$$.mock.results[0]!.value[0].$).toHaveReturnedWith(
            '$$[0].$$[1].$$[0].$',
        );
    });

    test('getElement(). EElementType.element. $$[0].$$[1].$$[0].$$', async () => {
        expect.assertions(5);

        const locator: TLocator = {
            element: [
                {
                    selector: 'first collection without index',
                    isCollection: true,
                },
                {
                    selector: 'second collection with index',
                    isCollection: true,
                    index: 1,
                },
                {
                    selector: 'third collection without index',
                    isCollection: true,
                },
                {
                    selector: 'forth collection without index',
                    isCollection: true,
                },
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement();

        expect($$).toHaveBeenCalledWith('first collection without index');

        expect($$Mock.mock.results[0]!.value[0].$$).toHaveBeenCalledWith('second collection with index');

        expect($$Mock.mock.results[0]!.value[0].$$.mock.results[0]!.value[1].$$).toHaveBeenCalledWith('third collection without index');

        expect($$Mock.mock.results[0]!.value[0].$$.mock.results[0]!.value[1].$$.mock.results[0]!.value[0].$$).toHaveBeenCalledWith(
            'forth collection without index',
        );
        expect($$Mock.mock.results[0]!.value[0].$$.mock.results[0]!.value[1].$$.mock.results[0]!.value[0].$$).toHaveReturnedWith([
            '$$[0].$$[1].$$[0].$$',
        ]);
    });

    test("getElement('one'). EElementType.page. $.$.$.$", async () => {
        expect.assertions(5);

        const locator = {
            element: ['app-root'],
            page: {
                element: ['body', 'app-root', 'third-selector', 'single-final'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.page);

        await locatorHandler.getElement('one');

        expect($).toHaveBeenCalledWith('body');

        expect($Mock.mock.results[0]!.value.$).toHaveBeenCalledWith('app-root');

        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$).toHaveBeenCalledWith('third-selector');

        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$.mock.results[0]!.value.$).toHaveBeenCalledWith('single-final');
        expect($Mock.mock.results[0]!.value.$.mock.results[0]!.value.$.mock.results[0]!.value.$).toHaveReturnedWith('$.$.$.$');
    });

    test("getElement('one'). EElementType.element. $", async () => {
        expect.assertions(1);

        const locator = {
            element: [
                {
                    _selector: 'body',
                },
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        // @ts-ignore
        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await expect(locatorHandler.getElement('one')).rejects.toThrow('The \'{"_selector":"body"} doesn\'t equal \'TSelector\' type');
    });

    test("getElement('one'). EElementType.element. $.$.$$[0].$", async () => {
        expect.assertions(1);

        const locator: TLocator = {
            element: [
                'body',
                'app-root',
                {
                    selector: 'collection selector',
                    isCollection: true,
                },
                'single-final',
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await expect(locatorHandler.getElement('one')).rejects.toThrow(
            'The element wasn\'t found with \'["body","app-root",' +
                '{"selector":"collection selector","isCollection":true},"single-final"]\' locator',
        );
    });

    test("getElement('one'). EElementType.element. $.$.$$[0].$$", async () => {
        expect.assertions(1);

        const locator: TLocator = {
            element: [
                'body',
                'app-root',
                {
                    selector: 'collection selector',
                    isCollection: true,
                },
                {
                    selector: 'final collection selector',
                    isCollection: true,
                },
            ],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await expect(locatorHandler.getElement()).rejects.toThrow(
            'The elements weren\'t found with \'["body","app-root",{"selector":"collection selector",' +
                '"isCollection":true},{"selector":"final collection selector","isCollection":true}]\' locator',
        );
    });

    test("getElement('one'). Search by text. Positive. EElementType.element. $$ (row text selector)", async () => {
        expect.assertions(2);

        const locator: TLocator = {
            element: [
                {
                    selector: 'row text selector',
                    isCollection: true,
                    text: 'row text example',
                },
            ],
            page: {
                element: ['body'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement();

        expect($$).toHaveBeenCalledWith('row text selector');

        await expect(locatorHandler.getElement()).resolves.toMatchObject({
            value: 'row text example',
        });
    });

    test("getElement('one'). Search by text. Positive. EElementType.element. $.$$", async () => {
        expect.assertions(3);

        const locator: TLocator = {
            element: [
                'body',
                {
                    selector: 'first text/value selector',
                    isCollection: true,
                    text: 'first text',
                },
            ],
            page: {
                element: ['body'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement();

        expect($).toHaveBeenCalledWith('body');

        expect($Mock.mock.results[0]!.value.$$).toHaveBeenCalledWith('first text/value selector');

        await expect(locatorHandler.getElement()).resolves.toMatchObject({
            value: 'first text/value example',
        });
    });

    test("getElement('one'). Search by text. EElementType.element. $.$$[0].$$ (collection > text)", async () => {
        expect.assertions(3);

        const locator: TLocator = {
            element: [
                'body',
                {
                    selector: 'collection > text',
                    isCollection: true,
                },
                {
                    selector: 'second text selector',
                    isCollection: true,
                    text: '$.$$[0].$$ (collection > text)',
                },
            ],
            page: {
                element: ['body'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement();

        expect($).toHaveBeenCalledWith('body');

        expect($Mock.mock.results[0]!.value.$$).toHaveBeenCalledWith('collection > text');

        expect($Mock.mock.results[0]!.value.$$.mock.results[0]!.value[0].$$).toHaveBeenCalledWith('second text selector');
    });

    test.skip("getElement('one'). Search by text. Negative. EElementType.element. $.$$ (no results)", async () => {
        expect.assertions(1);

        const locator: TLocator = {
            element: [
                'body',
                {
                    selector: 'no results',
                    isCollection: true,
                },
                {
                    selector: 'second text selector',
                    isCollection: true,
                    text: 'no results text',
                },
            ],
            page: {
                element: ['body'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await expect(locatorHandler.getElement()).rejects.toThrow(
            '[findElementsByText > textFinder] No elements found to search for text: no results text',
        );
    });

    test("getElement('one'). Search by value. EElementType.element. $.$$", async () => {
        expect.assertions(3);

        const locator: TLocator = {
            element: [
                'body',
                {
                    selector: 'first text/value selector',
                    isCollection: true,
                    text: 'second value example',
                },
            ],
            page: {
                element: ['body'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await locatorHandler.getElement();

        expect($).toHaveBeenCalledWith('body');

        expect($Mock.mock.results[0]!.value.$$).toHaveBeenCalledWith('first text/value selector');

        await expect(locatorHandler.getElement()).resolves.toMatchObject({
            value: 'second text/value example',
        });
    });

    test.skip("getElement('one'). Search by text and value. Negative. EElementType.element. $.$$", async () => {
        expect.assertions(1);

        const locator: TLocator = {
            element: [
                'body',
                {
                    selector: 'first text/value selector',
                    isCollection: true,
                    text: 'second value_',
                },
            ],
            page: {
                element: ['body'],
                url: '/base/home',
            },
        };

        const locatorHandler = new LocatorHandler(locator, EElementType.element);

        await expect(locatorHandler.getElement()).rejects.toThrow(
            '[findElementsByText > textFinder] There is no matched "second value_" text/value in the elements.',
        );
    });
});
