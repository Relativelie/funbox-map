import { pointErrorTexts } from "../../texts/pointErrorTexts";
import { PointsState, PointsAction, PointsActionTypes } from "../../types/pointsTypes";


const initialState: PointsState = {
    points: [],
    routes: [],
    indexOfPoint: 0,
    wrongPointError: "",
    isCorrectPoint: null,
    loading: false,
    isFetchFail: false,
    isFetchError: false,
    errorCode: null
}


export const pointsReducer = (state = initialState, action: PointsAction): PointsState => {
    switch (action.type) {

        case PointsActionTypes.CHECK_ADDING_POINT:
            if (action.checkingResult === "exact") {
                return {
                    ...state,
                    isCorrectPoint: true
                }
            }
            else {
                let errorText: string;
                if (["number", "near", "range"].some((el) => el === action.checkingResult)) {
                    errorText = pointErrorTexts.numberNearRange
                }
                else if (action.checkingResult === "street") {
                    errorText = pointErrorTexts.street
                }

                else if (action.checkingResult === "other") {
                    errorText = pointErrorTexts.other
                }
                else {
                    errorText = ""
                }

                return {
                    ...state,
                    wrongPointError: errorText
                }
            }

        case PointsActionTypes.FETCH_LONG_LATITUDE_BEGIN:
            return {
                ...state,
                loading: true
            }

        case PointsActionTypes.FETCH_LONG_LATITUDE_FATAL:
            return {
                ...state,
                loading: false,
                isFetchFail: true
            }

        case PointsActionTypes.FETCH_LONG_LATITUDE_ERROR:
            return {
                ...state,
                loading: false,
                isFetchError: true,
                errorCode: action.errorCode
            }

        case PointsActionTypes.FETCH_LONG_LATITUDE_SUCCESS:

            return {
                ...state,
                loading: false,
                isCorrectPoint: false,
                wrongPointError: ""
            }

        case PointsActionTypes.FETCH_LONG_LATITUDE:
            console.log(action.longLatitudeValue)
            return {
                ...state,
                points: [
                    ...state.points,
                    action.longLatitudeValue,
                ],
                routes: [
                    ...state.routes,
                    action.longLatitudeValue[0]
                ],

                indexOfPoint: state.indexOfPoint + 1,
                loading: false
            }

        case PointsActionTypes.REMOVE_POINT:
            const pointsCopy = [...state.points];
            pointsCopy.splice(action.indexToBeRemoved, 1)
            const routesCopy = [...state.routes];
            routesCopy.splice(action.indexToBeRemoved, 1);
            return {
                ...state,
                points: pointsCopy,
                routes: routesCopy
            }

        case PointsActionTypes.CHANGE_POINT_COORDINATES:

            const pointsC = [...state.points];
            pointsC.splice(action.key, 1, [action.coordinates, action.destinationName]);
            const routesC = [...state.routes];
            routesC.splice(action.key, 1, action.coordinates)

            return {
                ...state,
                points: pointsC,
                routes: routesC
            }

        case PointsActionTypes.DRAG_DROP:
            const allPoints = [...state.points];
            const pointElement = allPoints.splice(action.fromIndex, 1)[0];
            allPoints.splice(action.toIndex, 0, pointElement);
            const allRoutes = [...state.routes];
            const routeElement = allRoutes.splice(action.fromIndex, 1)[0];
            allRoutes.splice(action.toIndex, 0, routeElement)
            return {
                ...state,
                points: allPoints,
                routes: allRoutes
            }
        default:
            return state

    }
}