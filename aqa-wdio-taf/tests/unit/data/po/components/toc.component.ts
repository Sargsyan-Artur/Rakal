import { TComponent } from '../../../../../src/types';

export const tocComponent: TComponent = {
    selector: 'nb-sidebar nb-menu',
    children: {
        Items: {
            selector: 'li',
            isCollection: true,
        },
        Products: '[title="Products"]',
        Import: '[title="Import"]',
    },
};
