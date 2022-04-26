import { KeyboardEvent, useEffect, useRef } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { ymaps } from '../../hooks/ymapsConstant';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { getLongLangtitude } from '../../requests/getLongLangtitude';

import { Loading } from './loadingSpinner/Loading';
import { AddressInput } from './inputField/AddressInput';
import { Directions } from './directionsList/Directions';

import './Menu.scss';

export const Menu = () => {
    const myRef = useRef<HTMLInputElement>(null);
    const {
        checkAddingPoint,
        fetchLongLatitudeSuccess,
        pointDragging,
        fetchLongLatitudeBegin,
        fetchLongLatitudeFatal,
        fetchLongLatitudeError,
    } = useActions();
    const { points, isCorrectPoint, loading } = useTypedSelector((state) => state.points);

    useEffect(() => {
        const addPointToDirections = async () => {
            if (myRef.current !== null) {
                fetchLongLatitudeBegin();
                const result: any = await getLongLangtitude(myRef.current.value);
                if (result === 'fatal') {
                    fetchLongLatitudeFatal();
                } else if (result[0] === 'error') {
                    fetchLongLatitudeError(result[1]);
                } else {
                    fetchLongLatitudeSuccess(result);
                }
            }
        };

        if (isCorrectPoint) {
            addPointToDirections();
            if (myRef.current !== null) {
                myRef.current.value = '';
            }
        }
    }, [isCorrectPoint]);

    const pointVerify = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && myRef.current !== null) {
            const request = await ymaps.geocode(myRef.current.value);
            const result = await request.geoObjects.get(0);

            if (result) {
                const currentCase = result.properties.get('metaDataProperty.GeocoderMetaData.precision');
                checkAddingPoint(currentCase);
            } else checkAddingPoint('other');
        }
    };

    const checkLoadingProcess = () => {
        if (loading) {
            return (
                <Loading />
            );
        }
    };

    const handleOnDragEnd = (result: DropResult) => {
        if (result.destination !== undefined && result.destination !== null) {
            if (!result.destination) return;
            const fromIndex = result.source.index;
            const toIndex = result.destination.index;
            pointDragging(fromIndex, toIndex);
        }
    };

    return (
        <div className="menuContainer">
            <div className="inputContainer">
                <AddressInput refValue={myRef} pointVerify={pointVerify} />
                {checkLoadingProcess()}
            </div>

            <DragDropContext onDragEnd={(e) => handleOnDragEnd(e)}>
                <Droppable droppableId="group" type="group">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {points.map((element: [number[], string], index: number) => (
                                <Directions key={`point-${index}`} index={index} element={element} />
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};
