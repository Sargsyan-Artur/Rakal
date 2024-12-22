import { TPage } from '../../../../../src/types';
import { basePage } from './base.page';
import { productsComponent } from '../components/products.component';

export const homePage: TPage = {
    extends: basePage,
    name: 'Home',
    url: '/home',
    selector: 'app-root',
    children: {
        Products: productsComponent,
        'Negative one': {
            selector: 'negative_1',
            // @ts-ignore
            index: 0,
        },
        // @ts-ignore
        'Negative two': {
            selector: 'negative_2',
            text: 'error text',
        },
        'Negative three': {
            selector: 'negative_2',
            // @ts-ignore
            isCollection: false,
        },
    },
};
