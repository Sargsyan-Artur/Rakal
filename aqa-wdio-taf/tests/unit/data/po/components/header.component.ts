import { TComponent } from '../../../../../src/types';

export const headerComponent: TComponent = {
    selector: 'nb-layout-header',
    children: {
        Logo: '.logo',
        'Navigation menu': {
            selector: '.navigation',
            children: {
                'Commerce tools': '[href="/ct/catalogue/import"]',
                'Elastic path': '[href="/ep/catalogue/import"]',
            },
        },
        'User icon': 'app-user-control-button',
    },
};
