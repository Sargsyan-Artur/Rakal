import { TComponent } from '../../../../src/types';

export const sideBar: TComponent = {
    selector: '#sidebar',
    children: {
        Widgets: {
            selector: '.widget',
            isCollection: true,
            children: {
                Title: '.widget-title',
                Option: {
                    selector: 'li',
                    isCollection: true,
                },
            },
        },
    },
};
