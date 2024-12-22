import { TComponent } from '../../../../src/types';

export const menu: TComponent = {
    selector: '#main',
    children: {
        Items: {
            selector: 'li',
            isCollection: true,
        },
        Search: {
            selector: '.searchform',
            children: {
                placeholder: 'input',
                'submit btn': 'button',
            },
        },
    },
};
