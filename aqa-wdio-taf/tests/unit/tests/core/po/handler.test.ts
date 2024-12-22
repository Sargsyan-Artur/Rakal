import { expect } from '@jest/globals';

import { homePage } from '../../../data/po/pages/home.page';
import { PoHandler } from '../../../../../src/core/po';
import * as parser from '../../../../../src/core/po/parser';
import { Element, Page } from '../../../../../src/core/wdio';
import { EElementType } from '../../../../../src/core/wdio/interaction/enum';

jest.mock('@wdio/logger');
jest.mock('../../../../../src/core/wdio/interaction/element.ts');
jest.mock('../../../../../src/core/wdio/interaction/page.ts');

// @ts-ignore
const PoHandlerMock = PoHandler as jest.MockedClass<typeof PoHandler>;
const ElementMock = Element as jest.MockedClass<typeof Element>;
const PageMock = Page as jest.MockedClass<typeof Page>;

describe('core > po > handler', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.spyOn(parser, 'getLocatorByQuery');

        parser.initPo({
            [homePage.name]: homePage,
        });
    });

    test.skip('PoHandler', () => {
        expect.assertions(1);

        jest.mock('../../../../../src/core/po/handler/index.ts');

        PoHandler.init('Home page > Header');

        expect(PoHandlerMock).toHaveBeenCalledWith({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: ['body', 'app-root', 'nb-layout-header'],
        });
    });

    test('init', () => {
        expect.assertions(6);
        const po = PoHandler.init('Home page > Header');

        expect(parser.getLocatorByQuery).toHaveBeenCalledWith('Home page > Header');

        expect(po).toBeInstanceOf(PoHandler);

        expect(po.element).toBeInstanceOf(Element);

        expect(po.page).toBeInstanceOf(Page);

        const locator = {
            element: ['body', 'app-root', 'nb-layout-header'],
            page: {
                element: ['body', 'app-root'],
                url: '/base/home',
            },
        };

        expect(ElementMock).toHaveBeenCalledWith(locator, EElementType.element);
        expect(PageMock).toHaveBeenCalledWith(locator);
    });
});
