import { TComponent } from '../../../../../src/types';

export const multipleTables: TComponent = {
    selector: 'section#section-multiple-tables',
    children: {
        Title: 'h2',
        Description: 'p',
        ToDoItems: {
            selector: '#sortable-multi-tables-1',
            children: {
                Items: {
                    selector: '.sortable-item',
                    isCollection: true,
                },
            },
        },
        DoneItems: {
            selector: '#sortable-multi-tables-2',
            children: {
                Items: {
                    selector: '.sortable-item',
                    isCollection: true,
                },
            },
        },
    },
};
