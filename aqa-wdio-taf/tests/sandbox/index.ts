// srs/po/pages/base.page.ts
import { TPage } from '../../src/types';
import { getLocatorByQuery, initPo } from '../../src/core/po';

export const basePage: TPage = {
    name: 'Base',
    url: '/base',
    selector: 'body',
    children: {
        Header: {
            selector: 'header',
            children: {
                'Search input': '.search-input',
            },
        },
        com: {
            selector: '',
            // text: '0',
        },
    },
};

// srs/po/pages/home.page.ts
export const homePage: TPage = {
    extends: basePage,
    name: 'Home',
    url: '/home',
    selector: 'home-page-selector',
    children: {
        Menu: {
            selector: '.menu-selector',
            children: {
                'Active item': '.active-menu-item',
                Items: {
                    selector: '.menu-items',
                    isCollection: true,
                },
            },
        },
        'Get started btn': {
            selector: '.get-started-btn',
            isCollection: true,
            index: 2,
        },
        Table: {
            selector: '.table-selector',
            children: {
                Name: '.name-selector', // for textSelector and textCollection
                Rows: {
                    selector: '.rows-selector',
                    isCollection: true,
                    text: 'original',
                    children: {
                        Name: '.name-selector',
                    },
                },
            },
        },
    },
};

// srs/po/index.ts
initPo({
    [homePage.name]: homePage,
});

getLocatorByQuery('Home page > Table > (textCollection: 1st tr=Some text) > Name');

// The 'Home page > Table > 2st Rows > Name' element should be displayed
// $('body').$('home-page-selector').$('.table-selector').$$('.rows-selector')[1].$('.name-selector')

// The 'Home page > Table > Rows > Name' element should be displayed
// $('body').$('home-page-selector').$('.table-selector').$$('.rows-selector')[0].$('.name-selector') // [0] - default index in the index isn't specified

// The 'Home page > Table > (textSelector: tr=Some text) > Name' element should be displayed
// $('body').$('home-page-selector').$('.table-selector').$('tr=Some text').$('.name-selector')

// The 'Home page > Table > (textCollection: tr=Some text) > Name' element should be displayed
// $('body').$('home-page-selector').$('.table-selector').$$('tr=Some text')[0].$('.name-selector') // [0] - default index in the index isn't specified

// The 'Home page > Table > (textCollection: 2nd tr=Some text) > Name' element should be displayed
// $('body').$('home-page-selector').$('.table-selector').$$('tr=Some text')[1].$('.name-selector')

// somewhere in a scenario in a step_definition

// I should be on 'Home' page
// Will execute: $('body').$('home-page-selector')

// The 'Home page > Header' element should be displayed
// $('body').$('home-page-selector').$('header')

// The 'Home page > Menu > (textSelector: *=Some text)' element should be displayed
// $('body').$('home-page-selector').$('.menu-selector').$('*=Some text')

// The 'Home page > Menu > (textCollection: div=Some text)' element should be displayed
// $('body').$('home-page-selector').$('.menu-selector').$$('div=Some text')

// The 'Home page > Menu > (textCollection: 2nd div=Some text)' element should be displayed
// $('body').$('home-page-selector').$('.menu-selector').$$('div=Some text')[1]

// The 'Home page > Get started btn' element should be displayed
// $('body').$('home-page-selector').$$('.get-started-btn')[2]

// The 'Home page > Menu > Active item' element should be displayed
// $('body').$('home-page-selector').$('.menu-selector').$('.active-menu-item')

// The 'Home page > Menu > Items' element should be displayed
// $('body').$('home-page-selector').$('.menu-selector').$$('.menu-items')

// The 'Home page > Menu > 2nd Items' element should be displayed
// $('body').$('home-page-selector').$('.menu-selector').$$('.menu-items')[1]
