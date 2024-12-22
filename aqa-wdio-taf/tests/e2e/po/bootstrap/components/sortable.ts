import { TComponent } from '../../../../../src/types';

export const sorting: TComponent = {
    selector: 'section#section-sortable-basic-example',
    children: {
        Title: 'h2',
        Description: 'p',
        SortableList: {
            selector: '.sortable-list',
            children: {
                Items: {
                    selector: '.sortable-item',
                    isCollection: true,
                },
            },
        },
    },
};
