import { useEffect, useRef, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import {
    YMaps, Map, Placemark, Polyline,
} from 'react-yandex-maps';

import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import { getLongLangtitude } from '../../requests/getLongLangtitude';

import './myMap.scss';

export const MyMap = () => {
    const { points, routes, isFetchFatal } = useTypedSelector(
        (state) => state.points,
    );
    const { ChangePointCoordinates } = useActions();
    const [myCenter, setMyCenter] = useState({ center: [55.75, 37.57], zoom: 9 });
    const mapRef: any = useRef(null);

    useEffect(() => {
        if (points.length !== 0 && !isFetchFatal) {
            setMyCenter({ center: points[0][0], zoom: 13 });
        }
    }, [points]);

    const changeCoordinates = async (e: any, key: number) => {
        const coordinates = e.get('target').geometry.getCoordinates();
        const destinationName = await getLongLangtitude([
            coordinates[1],
            coordinates[0],
        ]);
        ChangePointCoordinates(key, coordinates, destinationName[1]);
    };

    return (
        <YMaps query={{ apikey: process.env.REACT_APP_API_KEY }}>
            <Map
                className="map"
                state={myCenter}
                instanceRef={(ref) => {
                    if (ref) mapRef.current = ref;
                }}
            >
                {points.map((elem: [number[], string], index: number) => (
                    <Placemark
                        className="placemark"
                        onDragEnd={(e: DropResult) => changeCoordinates(e, index)}
                        options={{
                            preset: 'islands#redDotIcon',
                            iconColor: 'rgba(145,14,190,0.8954175420168067)',
                            draggable: true,
                        }}
                        key={`placemark-${index}`}
                        geometry={elem[0]}
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                        properties={{
                            balloonContent: elem[1],
                        }}
                    />
                ))}

                <Polyline
                    geometry={routes}
                    options={{
                        balloonCloseButton: false,
                        strokeColor: 'rgba(114, 39, 222, 0.9010197829)',
                        strokeWidth: 5,
                        strokeOpacity: 0.7,
                    }}
                />
            </Map>
        </YMaps>
    );
};
