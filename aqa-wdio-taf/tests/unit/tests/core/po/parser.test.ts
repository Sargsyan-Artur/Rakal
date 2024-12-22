import { expect } from '@jest/globals';

import { homePage } from '../../../data/po/pages/home.page';
import * as parser from '../../../../../src/core/po/parser';
import { loginPage } from '../../../data/po/pages/login.page';

jest.mock('@wdio/logger');
jest.mock('@rak-aqa/utils');

describe('core > po > parser', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        jest.spyOn(parser, 'initPo');

        parser.initPo({
            [homePage.name]: homePage,
            [loginPage.name]: loginPage,
        });
    });

    test('initPo', () => {
        expect.assertions(1);

        expect(parser.initPo).toHaveBeenCalledWith({
            [homePage.name]: homePage,
            [loginPage.name]: loginPage,
        });
    });

    test('getLocatorByQuery with simple and collection selectors. Positive tests', () => {
        expect.assertions(9);

        expect(parser.getLocatorByQuery('Home page > Header')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: ['body', 'app-root', 'nb-layout-header'],
        });

        expect(parser.getLocatorByQuery('Home page > ToC > Items')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'nb-sidebar nb-menu',
                {
                    selector: 'li',
                    isCollection: true,
                },
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > Table > 1st Body Rows > Name')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                'app-catalogue-list-grid',
                {
                    selector: 'nb-list-item.ng-star-inserted .product-wrapper',
                    isCollection: true,
                    index: 0,
                },
                'div:nth-child(1)',
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > Table > Header Row > Commodity Type')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                'app-catalogue-list-grid',
                'nb-list-item:not(.catalog-row.ng-star-inserted) .product-wrapper',
                'div:nth-child(3)',
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > Element')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                {
                    selector: 'span',
                    isCollection: true,
                    index: 3,
                },
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > 1st Element')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                {
                    selector: 'span',
                    isCollection: true,
                    index: 0,
                },
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > 1st Element > Nested')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                {
                    selector: 'span',
                    isCollection: true,
                    index: 0,
                },
                {
                    isCollection: true,
                    selector: 'a',
                    index: 5,
                },
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > 1st Element > 2rd Nested')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                {
                    selector: 'span',
                    isCollection: true,
                    index: 0,
                },
                {
                    isCollection: true,
                    selector: 'a',
                    index: 1,
                },
            ],
        });

        expect(parser.getLocatorByQuery('Login page > username')).toStrictEqual({
            page: {
                url: '/login',
                element: ['body'],
            },
            element: ['body', '#username'],
        });
    });

    test('getLocatorByQuery with "textSelector/textCollection" query. Positive tests', () => {
        expect.assertions(6);

        expect(parser.getLocatorByQuery('Home page > Products > (textSelector: *=Text from an element)')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: ['body', 'app-root', 'app-catalogue', '*=Text from an element'],
        });

        expect(parser.getLocatorByQuery('Home page > Products > (textCollection: *=Texts from elements)')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                {
                    selector: '*=Texts from elements',
                    isCollection: true,
                },
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > (textCollection: 2nd *=Texts from elements)')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                {
                    selector: '*=Texts from elements',
                    isCollection: true,
                    index: 1,
                },
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > Table > (textSelector: *=Text from an element) > Name')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: ['body', 'app-root', 'app-catalogue', 'app-catalogue-list-grid', '*=Text from an element', 'div:nth-child(1)'],
        });

        expect(parser.getLocatorByQuery('Home page > Products > Table > (textCollection: *=Texts from elements) > Name')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                'app-catalogue-list-grid',
                {
                    selector: '*=Texts from elements',
                    isCollection: true,
                },
                'div:nth-child(1)',
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > Table > (textCollection: 3rd *=Texts from elements) > Name')).toStrictEqual(
            {
                page: {
                    url: '/base/home',
                    element: ['body', 'app-root'],
                },
                element: [
                    'body',
                    'app-root',
                    'app-catalogue',
                    'app-catalogue-list-grid',
                    {
                        selector: '*=Texts from elements',
                        isCollection: true,
                        index: 2,
                    },
                    'div:nth-child(1)',
                ],
            },
        );
    });

    test('getLocatorByQuery with "withText" query. Positive tests', () => {
        expect.assertions(5);

        expect(parser.getLocatorByQuery('Home page > Products > Table > Body Rows (withText: Some real text) > Name')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                'app-catalogue-list-grid',
                {
                    selector: 'nb-list-item.ng-star-inserted .product-wrapper',
                    isCollection: true,
                    text: 'Some real text',
                },
                'div:nth-child(1)',
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > Table > Footer Rows > Some elements > Names')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                'app-catalogue-list-grid',
                {
                    selector: 'footer rows selector',
                    isCollection: true,
                },
                {
                    selector: 'some elements selector',
                    isCollection: true,
                    index: 3,
                },
                {
                    selector: 'names selector',
                    isCollection: true,
                    text: 'Text from names in Some elements',
                },
            ],
        });

        expect(
            parser.getLocatorByQuery('Home page > Products > Table > Footer Rows > Some elements > Names (withText: New text)'),
        ).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                'app-catalogue-list-grid',
                {
                    selector: 'footer rows selector',
                    isCollection: true,
                },
                {
                    selector: 'some elements selector',
                    isCollection: true,
                    index: 3,
                },
                {
                    selector: 'names selector',
                    isCollection: true,
                    text: 'New text',
                },
            ],
        });

        expect(
            parser.getLocatorByQuery(
                'Home page > Products > Table > Footer Rows (withText: TEXT) > Some elements > Names (withText: New text)',
            ),
        ).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                'app-catalogue-list-grid',
                {
                    selector: 'footer rows selector',
                    isCollection: true,
                    text: 'TEXT',
                },
                {
                    selector: 'some elements selector',
                    isCollection: true,
                    index: 3,
                },
                {
                    selector: 'names selector',
                    isCollection: true,
                    text: 'New text',
                },
            ],
        });

        expect(parser.getLocatorByQuery('Home page > Products > Table > Footer Rows > Text elements > First')).toStrictEqual({
            page: {
                url: '/base/home',
                element: ['body', 'app-root'],
            },
            element: [
                'body',
                'app-root',
                'app-catalogue',
                'app-catalogue-list-grid',
                {
                    selector: 'footer rows selector',
                    isCollection: true,
                },
                {
                    selector: 'selector for text elems',
                    isCollection: true,
                    text: 'Text 1',
                },
                'first selector',
            ],
        });
    });

    test('getLocatorByQuery. Negative tests', () => {
        expect.assertions(13);

        expect(() => parser.getLocatorByQuery('')).toThrow("The passed 'query' is empty. Please provide the page name at least.");

        expect(() => parser.getLocatorByQuery('Home pAge')).toThrow(
            "The format of page name isn't correct. Current: 'Home pAge'. Expected: 'Home pAge page'",
        );

        expect(() => parser.getLocatorByQuery('Home')).toThrow(
            "The format of page name isn't correct. Current: 'Home'. Expected: 'Home page'",
        );

        expect(() => parser.getLocatorByQuery('Wrong page')).toThrow("There is no page with 'Wrong' name.");

        expect(() => parser.getLocatorByQuery('Home page > Header > Table')).toThrow(
            "There is no match for the passed 'Table' query item in PO. " +
                'If an index passed, it should contain: st | nd | rd | th (e.g.: 1st Items). ' +
                "Full query: 'Home page > Header > Table",
        );

        expect(() => parser.getLocatorByQuery('Home page > Products > 1st Element > Item')).toThrow(
            "There is no match for the passed 'Item' query item in PO. " +
                'If an index passed, it should contain: st | nd | rd | th (e.g.: 1st Items). ' +
                "Full query: 'Home page > Products > 1st Element > Item'",
        );

        expect(() => parser.getLocatorByQuery('Home page > ToC > 1 Items')).toThrow(
            "The passed query item doesn't meet the requirements. Current queryItem: '1 Items'. Examples: @rak-aqa/wdio-taf/README.md",
        );

        expect(() => parser.getLocatorByQuery('Home page > ToC > Items > Some element')).toThrow(
            'There is no match for last \'Some element\' query item in PO. Locator: \'{"page":{"url":"/base/home",' +
                '"element":["body","app-root"]},"element":["body","app-root","nb-sidebar nb-menu",{"selector":"li","isCollection":true}]}\'. ' +
                "Full query: 'Home page > ToC > Items > Some element'",
        );

        expect(() => parser.getLocatorByQuery('Home page > Negative one')).toThrow(
            "The 'text' and 'index' properties can be used only with 'isCollection: true'. Current queryItem: 'Negative one'",
        );

        expect(() => parser.getLocatorByQuery('Home page > Negative two')).toThrow(
            "The 'text' and 'index' properties can be used only with 'isCollection: true'. Current queryItem: 'Negative two'",
        );

        expect(() => parser.getLocatorByQuery('Home page > Negative three')).toThrow(
            "The 'isCollection' prop can have only 'true' value. Current queryItem: 'Negative three'",
        );

        expect(() => parser.getLocatorByQuery('Home page > 1st ToC')).toThrow(
            "The 'text' and 'index' properties can be used only with 'isCollection: true'. Current queryItem: 'ToC'",
        );

        expect(() => parser.getLocatorByQuery('Home page > ToC (withText: Text example)')).toThrow(
            "The 'text' and 'index' properties can be used only with 'isCollection: true'. Current queryItem: 'ToC'",
        );
    });
});
