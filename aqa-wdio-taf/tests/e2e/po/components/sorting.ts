import { TComponent } from '../../../../src/types';

export const sorting: TComponent = {
    selector: '#sortable',
    children: {
        Options: {
            selector: 'li',
            isCollection: true,
        },
    },
};
