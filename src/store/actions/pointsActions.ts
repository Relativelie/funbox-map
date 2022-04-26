import { PointsAction, PointsActionTypes } from '../../types/pointsTypes';

export const checkAddingPoint = (e: string): PointsAction => ({
    type: PointsActionTypes.CHECK_ADDING_POINT,
    checkingResult: e,
});

export const fetchLongLatitudeBegin = (): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_BEGIN,
});

export const fetchLongLatitudeSuccess = (
    result: [number[], string],
): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_SUCCESS,
    longLatitudeValue: result,
});

export const fetchLongLatitudeFatal = (): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_FATAL,
});

export const fetchLongLatitudeError = (errorCode: number): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_ERROR,
    errorCode,
});

export const removePoint = (pointKey: number): PointsAction => ({
    type: PointsActionTypes.REMOVE_POINT,
    indexToBeRemoved: pointKey,
});

export const pointDragging = (from: number, to: number): PointsAction => ({
    type: PointsActionTypes.DRAG_DROP,
    fromIndex: from,
    toIndex: to,
});

export const changePointCoordinates = (
    pointKey: number,
    coordinatesValue: Array<number>,
    destinationName: string,
): PointsAction => ({
    type: PointsActionTypes.CHANGE_POINT_COORDINATES,
    index: pointKey,
    coordinates: coordinatesValue,
    destinationName,
});
