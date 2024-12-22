import { expect } from '@jest/globals';

import { PoManager } from '../../../../../src/core/po';
import { homePage } from '../../../data/po/pages/home.page';
import { loginPage } from '../../../data/po/pages/login.page';

describe('core > po > manager', () => {
    let poManager: PoManager;

    beforeEach(() => {
        jest.resetAllMocks();

        poManager = new PoManager({
            [homePage.name]: homePage,
            [loginPage.name]: loginPage,
        });

        // @ts-ignore
        jest.spyOn(poManager, 'dereference');

        poManager.init();
    });

    test('dereference', () => {
        expect.assertions(2);

        // @ts-ignore
        expect(poManager.dereference).toHaveBeenCalledWith(homePage);

        // @ts-ignore
        expect(poManager.dereference).toHaveBeenCalledWith(loginPage);
    });
});
