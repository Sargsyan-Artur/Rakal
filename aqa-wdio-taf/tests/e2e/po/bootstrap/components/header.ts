import { TComponent } from '../../../../../src/types';

export const header: TComponent = {
    selector: '#mdb-navbar',
    children: {
        BurgerButton: '#sidenav-toggler',
        SearchInput: "input[type='search']",
    },
};
