import { TPage } from '../../../../src/types';
import { sorting } from '../components/sorting';
import { droppable } from '../components/droppable';

export const demoFrame: TPage = {
    name: 'DemoFrame',
    url: '',
    selector: 'html',
    children: {
        Sorting: sorting,
        Droppable: droppable,
    },
};
