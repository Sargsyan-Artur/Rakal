import { TPage } from '../../../../src/types';
import { menu } from '../components/menu';
import { sideBar } from '../components/sidebar';
import { content } from '../components/content';

export const basePage: TPage = {
    name: 'Base',
    url: 'https://jqueryui.com/',
    selector: '.home',
    children: {
        Menu: menu,
        SideBar: sideBar,
        Content: content,
    },
};
