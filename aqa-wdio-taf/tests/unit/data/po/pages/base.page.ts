import { TPage } from '../../../../../src/types';
import { tocComponent } from '../components/toc.component';
import { headerComponent } from '../components/header.component';

export const basePage: TPage = {
    name: 'Base',
    url: '/base',
    selector: 'body',
    children: {
        ToC: tocComponent,
        Header: headerComponent,
        'User Pop Up': {
            selector: '.nb-overlay-bottom-start',
            children: {
                'User name': 'p',
                'Log out btn': 'button',
            },
        },
        'Dropdown Options': {
            selector: '.option-list [id]',
            isCollection: true,
        },
    },
};
