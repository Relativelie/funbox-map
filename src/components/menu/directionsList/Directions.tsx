import { FC, MouseEvent } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { useActions } from '../../../hooks/useActions';

import './Directions.scss';

interface Props {
  index: number;
  element: [number[], string];
}

export const Directions: FC<Props> = ({ element, index }) => {
    const { RemovePoint } = useActions();

    const removeDirection = (e: MouseEvent<HTMLButtonElement>): void => {
        const { key } = (e.target as HTMLButtonElement).dataset;
        if (key !== undefined) RemovePoint(parseInt(key, 10));
    };

    return (
        <Draggable draggableId={`point-${index}`} index={index}>
            {(provided) => (
                <div
                    className="direction"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="directionName">
                        <p>{element[1]}</p>
                    </div>
                    <button
                        data-key={index}
                        type="button"
                        aria-label="remove direction"
                        onClick={(e) => {
                            removeDirection(e);
                        }}
                    >
            x
                    </button>
                </div>
            )}
        </Draggable>
    );
};
