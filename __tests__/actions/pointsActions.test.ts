import { changePointCoordinates, checkAddingPoint, fetchLongLatitudeBegin, fetchLongLatitudeError, fetchLongLatitudeFatal, fetchLongLatitudeSuccess, pointDragging, removePoint } from "../../src/store/actions/pointsActions";
import { PointsActionTypes } from "../../src/types/pointsTypes";


describe("points action creators", () => {
    test("action to verify result of checking name of destination", () => {
        const checkingResult = "other";
        expect(checkAddingPoint(checkingResult)).toEqual({
            type: PointsActionTypes.CHECK_ADDING_POINT,
            checkingResult
        });
    });
    
    test("action to set up loading page", () => {
        expect(fetchLongLatitudeBegin()).toEqual({
            type: PointsActionTypes.FETCH_LONG_LATITUDE_BEGIN
        });
    });
    
    test("action to add correct point into destination menu", () => {
        const longLatitudeValue = [[55.821805, 49.149704], 'Россия, Республика Татарстан, Казань, улица Четаева, 4'];
        expect(fetchLongLatitudeSuccess(longLatitudeValue)).toEqual({
            type: PointsActionTypes.FETCH_LONG_LATITUDE_SUCCESS,
            longLatitudeValue
        });
    });
    
    test("action to set up fatal page", () => {
        expect(fetchLongLatitudeFatal()).toEqual({
            type: PointsActionTypes.FETCH_LONG_LATITUDE_FATAL
        });
    });
    
    test("action to set up error page", () => {
        const errorCode = 404;
        expect(fetchLongLatitudeError(errorCode)).toEqual({
            type: PointsActionTypes.FETCH_LONG_LATITUDE_ERROR,
            errorCode
        });
    });
    
    test("action to remove point/route", () => {
        const indexToBeRemoved = 0;
        expect(removePoint(indexToBeRemoved)).toEqual({
            type: PointsActionTypes.REMOVE_POINT,
            indexToBeRemoved
        });
    });
    
    test("action to drag and drop point", () => {
        expect(pointDragging(3, 4)).toEqual({
            type: PointsActionTypes.DRAG_DROP,
            fromIndex: 3,
            toIndex: 4
        });
    });
    
    test("action to drag and drop point", () => {
        const index = 1;
        const coordinates = [55.83446264982311, 49.15107729101557];
        const destinationName = 'Россия, Республика Татарстан, Казань, Ново-Савиновский район, 27-й квартал';
        expect(changePointCoordinates(index, coordinates, destinationName)).toEqual({
            type: PointsActionTypes.CHANGE_POINT_COORDINATES,
            index,
            coordinates,
            destinationName
        });
    });
})
