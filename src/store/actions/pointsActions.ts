import { PointsAction, PointsActionTypes } from '../../types/pointsTypes';

export const CheckAddingPoint = (e: string): PointsAction => ({
    type: PointsActionTypes.CHECK_ADDING_POINT,
    checkingResult: e,
});

export const FetchLongLatitudeBegin = (): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_BEGIN,
});

export const FetchLongLatitudeSuccess = (
    result: [number[], string],
): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_SUCCESS,
    longLatitudeValue: result,
});

export const FetchLongLatitudeFatal = (): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_FATAL,
});

export const FetchLongLatitudeError = (errorCode: number): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_ERROR,
    errorCode,
});

export const RemovePoint = (pointKey: number): PointsAction => ({
    type: PointsActionTypes.REMOVE_POINT,
    indexToBeRemoved: pointKey,
});

export const PointDragging = (from: number, to: number): PointsAction => ({
    type: PointsActionTypes.DRAG_DROP,
    fromIndex: from,
    toIndex: to,
});

export const ChangePointCoordinates = (
    pointKey: number,
    coordinatesValue: Array<number>,
    destinationName: string,
): PointsAction => ({
    type: PointsActionTypes.CHANGE_POINT_COORDINATES,
    index: pointKey,
    coordinates: coordinatesValue,
    destinationName,
});
