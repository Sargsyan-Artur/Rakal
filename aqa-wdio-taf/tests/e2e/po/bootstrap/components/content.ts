import { TComponent } from '../../../../../src/types';
import { sorting } from '../components/sortable';
import { multipleTables } from '../components/multiple-tables';
import { inputFields } from '../components/unput.fields';

export const content: TComponent = {
    selector: '.mdb-docs-layout',
    children: {
        Sorting: sorting,
        MultipleTables: multipleTables,
        InputFields: inputFields,
    },
};
