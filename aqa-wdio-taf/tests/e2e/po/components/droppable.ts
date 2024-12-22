import { TComponent } from '../../../../src/types';

export const droppable: TComponent = {
    selector: 'body',
    children: {
        DraggableElement: {
            selector: '#draggable',
        },
        DroppableElement: {
            selector: '#droppable',
        },
    },
};
