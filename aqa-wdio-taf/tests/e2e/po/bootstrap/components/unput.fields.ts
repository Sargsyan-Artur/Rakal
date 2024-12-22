import { TComponent } from '../../../../../src/types';

export const inputFields: TComponent = {
    selector: 'div#docsTabsOverview',
    children: {
        'basic example': {
            selector: '#section-basic-example',
            children: {
                title: 'h2',
                input: '#form11',
            },
        },
    },
};
