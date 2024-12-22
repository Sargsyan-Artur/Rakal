# @rak-aqa/wdio-taf

## Get started

1.  Install dependencies: `npm i @rak-aqa/wdio-taf`
2.  How to use:

    1. Connection the predefined `step_definition` to `WDIO/Cucumber`:

    ```typescript
    // wdio.conf.ts
    export const config: WebdriverIO.Config = {
        cucumberOpts: {
            require: [
                // Steps and PO initialization
                require.resolve('@rak-aqa/wdio-taf/build/src/steps'), // predefined steps
                './src/steps/**/*.ts', // custom steps
            ],
            // ...
        },
    };
    ```

    2. Creation new `PO`:

    ```typescript
    // src/po/components/header.component.ts
    import { TComponent } from '@rak-aqa/wdio-taf';

    export const headerComponent: TComponent = {
        selector: 'nb-layout-header',
        children: {
            Logo: '.logo',
        },
    };

    // src/po/pages/base.page.ts
    import { TPage } from '@rak-aqa/wdio-taf';

    import { headerComponent } from '@po/components/header.component';

    export const basePage: TPage = {
        name: 'Base',
        url: '',
        selector: 'app-root',
        children: {
            Header: headerComponent,
        },
    };

    // src/po/pages/home.page.ts
    import { TPage } from '@rak-aqa/wdio-taf';

    import { basePage } from '@po/pages/base.page';

    export const homePage: TPage = {
        extends: basePage,
        name: 'Home',
        url: '',
        selector: '',
    };

    // src/po/pages/login.page.ts
    import { TPage } from '@rak-aqa/wdio-taf';

    export const loginPage: TPage = {
        name: 'Login',
        url: '',
        selector: '.sign-in-form__form',
        children: {
            username: '#username',
            password: '#password',
            submit: '#kc-login',
        },
    };
    ```

    3. Initialization `PO` and connection to `WDIO/Cucumber`:

    ```typescript
    // src/po/index.ts
    import { initPo } from '@rak-aqa/wdio-taf';

    import { homePage } from '@po/pages/home.page';
    import { loginPage } from '@po/pages/login.page';

    initPo({
        [homePage.name]: homePage,
        [loginPage.name]: loginPage,
    });

    // wdio.conf.ts
    export const config: WebdriverIO.Config = {
        cucumberOpts: {
            require: [
                // Steps and PO initialization
                require.resolve('@rak-aqa/wdio-taf/build/src/steps'), // predefined steps
                './src/steps/**/*.ts', // custom steps
                './src/po/index.ts', // PO initialization
            ],
            // ...
        },
    };
    ```

    4. Creation `Hooks` (`steps`) based on `PO` and connection to `WDIO/Cucumber`:

    ```typescript
    // src/hooks/login.ts
    import { Before } from '@wdio/cucumber-framework';
    import { PoHandler } from '@rak-aqa/wdio-taf';

    Before(() => PoHandler.init('Login').page.open());

    // wdio.conf.ts
    export const config: WebdriverIO.Config = {
        cucumberOpts: {
            require: [
                // Steps and PO initialization
                require.resolve('@rak-aqa/wdio-taf/build/src/steps'), // predefined steps
                './src/steps/**/*.ts', // custom steps
                './src/hooks/**/*.ts', // custom hooks
                './src/po/index.ts', // PO initialization
            ],
            // ...
        },
    };
    ```

    5. Adding `DeviceFarm` service to `WDIO`:

    ```typescript
    // wdio.conf.ts
    import { deviceFarmLauncher } from '@rak-aqa/wdio-taf';

    export const config: WebdriverIO.Config = {
        services: [
            [
                deviceFarmLauncher,
                {
                    expiresInSeconds: +nconf.get('expiresInSeconds'),
                },
            ],
        ],
    };
    ```

    -   Required variables: `DF_BROWSER_ARN`, `DF_AWS_REGION` (Optional. Default: `us-west-2`).

        > For local run it's necessary to setup the following env vars as well (from aws console): AWS_ACCESS_KEY_ID; AWS_SECRET_ACCESS_KEY; AWS_SESSION_TOKEN

    -   Possible CLI params: `--expiresInSeconds=%number%` (When a browser session will be expired if no any requests)

    6. Query API (`{query}` in step_definitions):

    > More information about selectors in WDIO: https://webdriver.io/docs/selectors

    ```typescript
    // srs/po/pages/base.page.ts
    import { TPage } from '@rak-aqa/wdio-taf';

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
        },
    };

    // srs/po/pages/home.page.ts
    import { TPage } from '@rak-aqa/wdio-taf';

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
                        children: {
                            Name: '.name-selector',
                        },
                    },
                },
            },
        },
    };

    // srs/po/index.ts/
    import { initPo } from '@rak-aqa/wdio-taf';

    import { homePage } from './pages/home.page';

    initPo({
        [homePage.name]: homePage,
    });

    // somewhere in a scenario (src/features/home.page.feature):

    // I navigate to 'Home' page
    // final url: <baseUrl>/base/home

    // I should be on 'Home' page
    // Will be executed the following expression: $('body').$('home-page-selector')

    // The 'Home page > Header' element should be displayed
    // $('body').$('home-page-selector').$('header')
    // (here all selectors will be concatenated and the search will be done as a chain of elements)
    // it means the following expressions aren't equal each other in some cases:
    // $('body').$('home-page-selector').$('header') !== $('body home-page-selector header')
    // the main trick here might be that if the `home-page-selector` element is a collection on the page, wdio will use the first element and the final result may differ from what is expected.

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

    // Table
    // The 'Home page > Table > 2st Rows > Name' element should be displayed
    // $('body').$('home-page-selector').$('.table-selector').$$('.rows-selector')[1].$('.name-selector')

    // The 'Home page > Table > Rows > Name' element should be displayed
    // $('body').$('home-page-selector').$('.table-selector').$$('.rows-selector')[0].$('.name-selector') // [0] - default index in the index isn't specified

    // Working with row selectors in the query
    // The 'Home page > Table > (textSelector: tr=Some text) > Name' element should be displayed
    // $('body').$('home-page-selector').$('.table-selector').$('tr=Some text').$('.name-selector')

    // The 'Home page > Table > (textCollection: tr=Some text) > Name' element should be displayed
    // $('body').$('home-page-selector').$('.table-selector').$$('tr=Some text')[0].$('.name-selector') // [0] - default index in the index isn't specified

    // The 'Home page > Table > (textCollection: 2nd tr=Some text) > Name' element should be displayed
    // $('body').$('home-page-selector').$('.table-selector').$$('tr=Some text')[1].$('.name-selector')

    // (!) EXPERIMENTAL
    // Working with row text in the query
    // I click on 'Home page > Table > Rows (withText: My Brand) > Name' element
    // $('body').$('home-page-selector').$('.table-selector').$$('.rows-selector')[here will be performed search for the provided text: 'My Brand'].$('.name-selector')
    ```

3.  Predefined `step_definitions`:

    Hints of using `step_definitions`:

          {pageName} - 'Home'
          {url} - 'https://...'
          {query} - 'Home page > Header' OR 'Home page > Table > 1st Row'
          {keyName} - 'Left arrow' OR 'Left arrow,Back space'. [More info](https://w3c.github.io/webdriver/webdriver-spec.html#keyboard-actions)
          {attribute} - 'class' and etc
          {number} - 1, 2 ...
          {property} - 'display'
          {string} - 'Hello my name is'
          {path} - './parth/to/file'
          {range} - '[1.23, 4]' OR '(12, 15)' OR '[10, 15)' OR '(1.2, 1.55]'
          {memoryKey} - the key name to get an element from memory

    1. Actions:
        1. Page:
            1. `I navigate to '{pageName}' page`
            2. `I am on '{url|memoryKey}' url`
            3. `I open '{pageName}' page in new tab`
            4. `I open page by '{url|memoryKey}' url in new tab`
            5. `I click on browser (back|forward|refresh) button`
            6. `I switch window to '{url|tabTitle|memoryKey}'`
            7. `I switch to '{pageName|frameName}' frame on the page`
        2. Keyboard:
            1. `I type '{string|memoryKey}' in '{query}' field`
            2. `I clear value in '{query}'`
            3. `I type random '{count}'? (alphabetic|numeric|alphanumeric) values in '{query}' field`
            4. `I type '{string|memoryKey}' text as unique value in '{query}' field`
            5. `I type '{string|memoryKey}' in '{query}' field with existing value`
            6. `I press '{keyName}' on the keyboard`
            7. `I press '{keyName}' on the keyboard '{number}' times`
            8. `I press '{keyName}' on the keyboard while having focus on '{query}'`
        3. Mouse:
            1. `I click on '{query}' element`
            2. `I click outside of '{query}' element`
            3. `I click outside of '{query}' element with {number} pixel offset`
            4. `I click on '{query}' element with text '{text}' (being case insensitive)?`
            5. `I click on the (first|last|{number}) las element of '{query}' collection`
            6. `I select '{query}' element to upload '{path}' file`
            7. `I should select '{query}' element by '{attribute}' attribute with '{string}' value`
            8. `I scroll to the '{query}' element( with (start|center|end|nearest) block)?`
            9. `I scroll to the (top|bottom) of the '{pageName}' page`
            10. `I move mouse over '{query}' element`
            11. `I drag and drop '{query}' element to '{query}' element`
            12. `I drag and drop '{query}' element to 'x:{number}' and 'y:{number}' coordinates`
        4. Technical:
            1. `I should wait {number} seconds`
    2. Validations:
        1. Page:
            1. `I should be on '{pageName}' page`
        2. Visibility:
            1. `The '{query}' element should (not )?(be displayed|be clickable|exist|be focused|be disabled|be enabled|be selected|be displayed in viewport)`
        3. Text and Value:
            1. `The '{query}' element text should (not )?(be|contain|matches) '{string|memoryKey}'`
            2. `The value of '{query}' should (not )?(be|contain|matches) '{string|memoryKey}'`
            3. `The all texts of '{query}' should (not )?(be|contain|matches) '{string|memoryKey}'`
        4. Count:
            1. `The count of '{query}' should (be equal|not be|be more than|be less than) '{number|memoryKey}'`
            2. `The count of '{query}' should (not )?be in range '{string}'`
        5. Length and Range:
            1. `The length of value in '{query}' (?:input|text area) should be equal to '{number}' characters`
            2. `The length of text in '{query}' element should be equal to '{number}' characters`
            3. `The value of '{query}' should (be in range) '{range}'`
        6. Sorting:
            1. `The '{query}' elements are sorted in (asc|desc) order by (numbers)`
            2. `The '{string}' element of the '{memoryKey}' array should be after '{string}' element in the '{memoryKey}' array`
        7. CSS and HTML:
            1. `The '{property}' CSS property of '{query}' element should (not )?(be|contain) '{string|memoryKey}'`
            2. `The '{attribute}' attribute text of '{query}' element should (not )?(be|contain) '{string|memoryKey}'`
    3. Wait:
        1. `I should wait for '{query}' element (not )?(be displayed|be clickable|exist|be enabled)`
    4. Memory
        1. Page:
            1. `I remember the page URL as '{string}'`
        2. Actions:
            1. `I remember the text of '{query}' as '{memoryKey}'`
            2. `I remember the text of the (first|last|{number}) element of '{query}' collection as '{keyName}'`
            3. `I remember the value of '{query}' as '{memoryKey}'`
            4. `I remember the '{string}' attribute of '{query}' as '{memoryKey}'`
            5. `I remember the number of '{query}' as '{memoryKey}'`
            6. `I remember the order of '{query}' as '{memoryKey}'`
            7. `I remember the '{string}' CSS property value of '{query}' as '{memoryKey}'`
            8. `I remember random '{count}' (alphabetic|numeric|alphanumeric) values as '{keyName}'`
            9. `I delete '{memoryKey}' from memory`
            10. `I clear memory`
