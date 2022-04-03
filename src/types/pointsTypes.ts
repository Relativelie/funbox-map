export interface PointsState {
    points: Array<[Array<number>, string]>,
    routes: Array<Array<number>>,
    wrongPointError: string,
    indexOfPoint: number,
    isCorrectPoint: boolean | null,
    loading: boolean,
    isFetchFail: boolean,
    isFetchError: boolean,
    errorCode: number | null
}

export enum PointsActionTypes {
    CHECK_ADDING_POINT = "CHECK_ADDING_POINT",
    FETCH_LONG_LATITUDE_BEGIN = "FETCH_LONG_LATITUDE_BEGIN",
    FETCH_LONG_LATITUDE_SUCCESS = "FETCH_LONG_LATITUDE_SUCCESS",
    FETCH_LONG_LATITUDE_FATAL = "FETCH_LONG_LATITUDE_FATAL",
    FETCH_LONG_LATITUDE_ERROR = "FETCH_LONG_LATITUDE_ERROR",
    FETCH_LONG_LATITUDE = "FETCH_LONG_LATITUDE",
    REMOVE_POINT = "REMOVE_POINT",
    CHANGE_POINT_COORDINATES = "CHANGE_POINT_COORDINATES",
    DRAG_DROP = "DRAG_DROP"
}

interface checkAddingPoint {
    type: PointsActionTypes.CHECK_ADDING_POINT,
    checkingResult: string
}

interface fetchLongLatitudeBegin {
    type: PointsActionTypes.FETCH_LONG_LATITUDE_BEGIN
}

interface fetchLongLatitudeSuccess {
    type: PointsActionTypes.FETCH_LONG_LATITUDE_SUCCESS
}

interface fetchLongLatitudeFatal {
    type: PointsActionTypes.FETCH_LONG_LATITUDE_FATAL
}

interface fetchLongLatitudeError {
    type: PointsActionTypes.FETCH_LONG_LATITUDE_ERROR,
    errorCode: number
}

interface fetchLongLatitude {
    type: PointsActionTypes.FETCH_LONG_LATITUDE,
    longLatitudeValue: any
}

interface removePoint {
    type: PointsActionTypes.REMOVE_POINT,
    indexToBeRemoved: number
}

interface changePointCoordinates {
    type: PointsActionTypes.CHANGE_POINT_COORDINATES,
    key: number,
    coordinates: Array<number>,
    destinationName: string
}

interface pointDragging {
    type: PointsActionTypes.DRAG_DROP
    fromIndex: number,
    toIndex: number
}

export type PointsAction =
    checkAddingPoint
    | fetchLongLatitudeBegin
    | fetchLongLatitudeSuccess
    | fetchLongLatitudeFatal
    | fetchLongLatitudeError
    | fetchLongLatitude
    | removePoint
    | changePointCoordinates
    | pointDragging