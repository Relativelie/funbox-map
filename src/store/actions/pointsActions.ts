import { PointsAction, PointsActionTypes } from "../../types/pointsTypes";
import { Dispatch } from "react";
import { getLongLangtitude } from "../../requests/getLongLangtitude";


export const checkAddingPoint = (e: string): PointsAction => ({
    type: PointsActionTypes.CHECK_ADDING_POINT,
    checkingResult: e
});

export const fetchLongLatitudeBegin = (): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_BEGIN
});

export const fetchLongLatitudeSuccess = (): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_SUCCESS
});

export const fetchLongLatitudeFatal = (): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_FATAL
});

export const fetchLongLatitudeError = (errorCode: number): PointsAction => ({
    type: PointsActionTypes.FETCH_LONG_LATITUDE_ERROR,
    errorCode: errorCode
});

export const fetchLongLatitude = (pointValue: string) => {
    return async (dispatch: Dispatch<PointsAction>) => {
        dispatch(fetchLongLatitudeBegin());
        const result = await getLongLangtitude(pointValue);

        if (result === "fatal") {
            dispatch(fetchLongLatitudeFatal());
        }
        else if(result[0] === "error") {
            dispatch(fetchLongLatitudeError(result[1]))
        }
        else {
            dispatch(fetchLongLatitudeSuccess());
            dispatch({
                type: PointsActionTypes.FETCH_LONG_LATITUDE,
                longLatitudeValue: result
            })
        }
    };
};

export const removePoint = (pointKey: number) => ({
    type: PointsActionTypes.REMOVE_POINT,
    indexToBeRemoved: pointKey 
});

export const pointDragging = (from: number, to: number) => ({
    type: PointsActionTypes.DRAG_DROP,
    fromIndex: from,
    toIndex: to
})

export const changePointCoordinates = (pointKey: number, coordinatesValue: Array<number>, destinationName: string) => ({
    type: PointsActionTypes.CHANGE_POINT_COORDINATES,
    key: pointKey, 
    coordinates: coordinatesValue,
    destinationName: destinationName
});