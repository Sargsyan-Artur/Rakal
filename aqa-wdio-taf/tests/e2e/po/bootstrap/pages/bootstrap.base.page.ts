import { TPage } from '../../../../../src/types';
import { header } from '../components/header';
import { sideNav } from '../components/side-nav';
import { content } from '../components/content';

export const bootstrapBasePage: TPage = {
    name: 'BootstrapBase',
    url: 'https://mdbootstrap.com/',
    selector: '.mdb-skin-custom',
    children: {
        Header: header,
        SideNav: sideNav,
        Content: content,
    },
};
