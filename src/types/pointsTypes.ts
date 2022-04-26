export interface PointsState {
    points: Array<[Array<number>, string]>,
    routes: Array<Array<number>>,
    wrongPointError: string,
    isCorrectPoint: boolean | null,
    loading: boolean,
    isFetchFatal: boolean,
    isFetchError: boolean,
    errorCode: number | null
}

export enum PointsActionTypes {
    CHECK_ADDING_POINT = 'CHECK_ADDING_POINT',
    FETCH_LONG_LATITUDE_BEGIN = 'FETCH_LONG_LATITUDE_BEGIN',
    FETCH_LONG_LATITUDE_SUCCESS = 'FETCH_LONG_LATITUDE_SUCCESS',
    FETCH_LONG_LATITUDE_FATAL = 'FETCH_LONG_LATITUDE_FATAL',
    FETCH_LONG_LATITUDE_ERROR = 'FETCH_LONG_LATITUDE_ERROR',
    REMOVE_POINT = 'REMOVE_POINT',
    CHANGE_POINT_COORDINATES = 'CHANGE_POINT_COORDINATES',
    DRAG_DROP = 'DRAG_DROP',
}

interface CheckAddingPoint {
    type: PointsActionTypes.CHECK_ADDING_POINT,
    checkingResult: string
}

interface FetchLongLatitudeBegin {
    type: PointsActionTypes.FETCH_LONG_LATITUDE_BEGIN
}

interface FetchLongLatitudeSuccess {
    type: PointsActionTypes.FETCH_LONG_LATITUDE_SUCCESS,
    longLatitudeValue: [number[], string]
}

interface FetchLongLatitudeFatal {
    type: PointsActionTypes.FETCH_LONG_LATITUDE_FATAL
}

interface FetchLongLatitudeError {
    type: PointsActionTypes.FETCH_LONG_LATITUDE_ERROR,
    errorCode: number
}

interface RemovePoint {
    type: PointsActionTypes.REMOVE_POINT,
    indexToBeRemoved: number
}

interface ChangePointCoordinates {
    type: PointsActionTypes.CHANGE_POINT_COORDINATES,
    index: number,
    coordinates: Array<number>,
    destinationName: string
}

interface PointDragging {
    type: PointsActionTypes.DRAG_DROP
    fromIndex: number,
    toIndex: number
}

export type PointsAction =
    CheckAddingPoint
    | FetchLongLatitudeBegin
    | FetchLongLatitudeSuccess
    | FetchLongLatitudeFatal
    | FetchLongLatitudeError
    | RemovePoint
    | ChangePointCoordinates
    | PointDragging;
