import { expect } from '@jest/globals';

import { Element, ElementExpects, ElementWaits, LocatorHandler } from '../../../../../../src/core/wdio';
import { EElementType } from '../../../../../../src/core/wdio/interaction/enum';

jest.mock('@wdio/logger');
jest.mock('../../../../../../src/core/wdio/interaction/locator.handler.ts');
jest.mock('../../../../../../src/core/wdio/waits/element.waits.ts');
jest.mock('../../../../../../src/core/wdio/waits/page.waits.ts');
jest.mock('../../../../../../src/core/wdio/expects/element.expects.ts');
jest.mock('../../../../../../src/core/wdio/expects/page.expects.ts');

const LocatorHandlerMock = LocatorHandler as jest.MockedClass<typeof LocatorHandler>;
const ElementWaitsMock = ElementWaits as jest.MockedClass<typeof ElementWaits>;
const ElementExpectsMock = ElementExpects as jest.MockedClass<typeof ElementExpects>;

describe('core > wdio > interaction > element', () => {
    let element: Element;

    const locator = {
        element: ['body', 'app-root', 'nb-layout-header'],
        page: {
            element: ['body', 'app-root'],
            url: '/base/home',
        },
    };

    beforeEach(() => {
        jest.resetAllMocks();
        element = new Element(locator, EElementType.element);
    });

    test('LocatorHandler', () => {
        expect.assertions(1);

        expect(LocatorHandlerMock).toHaveBeenCalledWith(locator, EElementType.element);
    });

    test('ElementWaits', () => {
        expect.assertions(1);

        expect(ElementWaitsMock).toHaveBeenCalledWith(locator, EElementType.element);
    });

    test('ElementExpects', () => {
        expect.assertions(1);

        expect(ElementExpectsMock).toHaveBeenCalledWith(element, locator, EElementType.element);
    });

    test('getters', () => {
        expect.assertions(2);

        expect(element.expect).toBeInstanceOf(ElementExpects);
        expect(element.wait).toBeInstanceOf(ElementWaits);
    });
});
