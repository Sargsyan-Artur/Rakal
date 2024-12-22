import { TComponent } from '../../../../../src/types';

export const sideNav: TComponent = {
    selector: '.sidenav-menu',
    children: {
        Items: {
            selector: 'a[role="button"]',
            isCollection: true,
        },
    },
};
