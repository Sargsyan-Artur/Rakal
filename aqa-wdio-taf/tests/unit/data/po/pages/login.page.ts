import { TPage } from '../../../../../src/types';

export const loginPage: TPage = {
    extends: {
        name: 'Base',
        selector: 'body',
        url: '/login',
    },
    name: 'Login',
    url: '',
    selector: '',
    children: {
        username: '#username',
        password: '#password',
        submit: '#kc-login',
    },
};
