import { wrongPointNameErrors } from './wrongPointNameErrors';
import { PointsState, PointsAction, PointsActionTypes } from '../../types/pointsTypes';

const initialState: PointsState = {
    points: [],
    routes: [],
    wrongPointError: '',
    isCorrectPoint: null,
    loading: false,
    isFetchFatal: false,
    isFetchError: false,
    errorCode: null,
};

export const pointsReducer = (state = initialState, action: PointsAction): PointsState => {
    switch (action.type) {
        case PointsActionTypes.CHECK_ADDING_POINT:
            if (action.checkingResult === 'exact') {
                return {
                    ...state,
                    isCorrectPoint: true,
                };
            }

            let errorText: string;
            if (['number', 'near', 'range'].some((el) => el === action.checkingResult)) {
                errorText = wrongPointNameErrors.numberNearRange;
            } else if (action.checkingResult === 'street') {
                errorText = wrongPointNameErrors.street;
            } else if (action.checkingResult === 'other') {
                errorText = wrongPointNameErrors.other;
            } else {
                errorText = '';
            }

            return {
                ...state,
                wrongPointError: errorText,
            };

        case PointsActionTypes.FETCH_LONG_LATITUDE_BEGIN:
            return {
                ...state,
                loading: true,
            };

        case PointsActionTypes.FETCH_LONG_LATITUDE_FATAL:
            return {
                ...state,
                loading: false,
                isFetchFatal: true,
            };

        case PointsActionTypes.FETCH_LONG_LATITUDE_ERROR:
            return {
                ...state,
                loading: false,
                isFetchError: true,
                errorCode: action.errorCode,
            };

        case PointsActionTypes.FETCH_LONG_LATITUDE_SUCCESS:
            return {
                ...state,
                loading: false,
                isCorrectPoint: false,
                wrongPointError: '',
                points: [
                    ...state.points,
                    action.longLatitudeValue,
                ],
                routes: [
                    ...state.routes,
                    action.longLatitudeValue[0],
                ],
            };

        case PointsActionTypes.REMOVE_POINT:
            const pointsCopy = [...state.points];
            pointsCopy.splice(action.indexToBeRemoved, 1);
            const routesCopy = [...state.routes];
            routesCopy.splice(action.indexToBeRemoved, 1);
            return {
                ...state,
                points: pointsCopy,
                routes: routesCopy,
            };

        case PointsActionTypes.CHANGE_POINT_COORDINATES:

            const pointsC = [...state.points];
            const routesC = [...state.routes];
            if (action.index < pointsC.length && action.index >= 0 && pointsC.length !== 0) {
                pointsC.splice(action.index, 1, [action.coordinates, action.destinationName]);
                routesC.splice(action.index, 1, action.coordinates);
            }

            return {
                ...state,
                points: pointsC,
                routes: routesC,
            };

        case PointsActionTypes.DRAG_DROP:
            const allPoints = [...state.points];
            const allRoutes = [...state.routes];
            if (action.fromIndex >= 0 && action.toIndex >= 0) {
                const pointElement = allPoints.splice(action.fromIndex, 1)[0];
                allPoints.splice(action.toIndex, 0, pointElement);
                const routeElement = allRoutes.splice(action.fromIndex, 1)[0];
                allRoutes.splice(action.toIndex, 0, routeElement);
            }
            return {
                ...state,
                points: allPoints,
                routes: allRoutes,
            };

        default:
            return state;
    }
};
