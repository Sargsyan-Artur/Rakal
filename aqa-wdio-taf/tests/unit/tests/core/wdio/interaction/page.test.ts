import { expect } from '@jest/globals';

import { EElementType } from '../../../../../../src/core/wdio/interaction/enum';
import { Element, LocatorHandler, Page, PageExpects, PageWaits } from '../../../../../../src/core/wdio';

jest.mock('@wdio/logger');
jest.mock('../../../../../../src/core/wdio/interaction/locator.handler.ts');
jest.mock('../../../../../../src/core/wdio/waits/element.waits.ts');
jest.mock('../../../../../../src/core/wdio/waits/page.waits.ts');
jest.mock('../../../../../../src/core/wdio/expects/element.expects.ts');
jest.mock('../../../../../../src/core/wdio/expects/page.expects.ts');

const LocatorHandlerMock = LocatorHandler as jest.MockedClass<typeof LocatorHandler>;
const PageWaitsMock = PageWaits as jest.MockedClass<typeof PageWaits>;
const PageExpectsMock = PageExpects as jest.MockedClass<typeof PageExpects>;

describe('core > wdio > interaction > page', () => {
    let page: Page;

    const locator = {
        element: ['body', 'app-root', 'nb-layout-header'],
        page: {
            element: ['body', 'app-root'],
            url: '/base/home',
        },
    };

    beforeEach(() => {
        jest.resetAllMocks();
        page = new Page(locator);
    });

    test('LocatorHandler', () => {
        expect.assertions(1);

        expect(LocatorHandlerMock).toHaveBeenCalledWith(locator, EElementType.page);
    });

    test('PageWaitsMock', () => {
        expect.assertions(1);

        expect(PageWaitsMock).toHaveBeenCalledWith(locator, EElementType.page);
    });

    test('PageExpectsMock', () => {
        expect.assertions(1);

        expect(PageExpectsMock).toHaveBeenCalledWith(locator, EElementType.page);
    });

    test('getters', () => {
        expect.assertions(3);

        expect(page.element).toBeInstanceOf(Element);
        expect(page.wait).toBeInstanceOf(PageWaits);
        expect(page.expect).toBeInstanceOf(PageExpects);
    });
});
