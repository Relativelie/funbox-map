import { checkAddingPoint } from "../../src/store/actions/pointsActions";
import { pointsReducer } from "../../src/store/reducers/pointsReducer";
import { wrongPointNameErrors } from "../../src/store/reducers/wrongPointNameErrors";

import { stateFullPointsRouts } from "./stateVariables";


describe("points reducer - check adding point name", () => {
    // Positive tests.
    test("checking result === 'exact'", () => {
        const newState = pointsReducer(stateFullPointsRouts, checkAddingPoint("exact"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, isCorrectPoint: true })
    });

    test("checking result === 'number'", () => {
        const newState = pointsReducer(stateFullPointsRouts, checkAddingPoint("number"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: wrongPointNameErrors.numberNearRange })
    });

    test("checking result === 'near'", () => {
        const newState = pointsReducer(stateFullPointsRouts, checkAddingPoint("near"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: wrongPointNameErrors.numberNearRange })
    });

    test("checking result === 'range'", () => {
        const newState = pointsReducer(stateFullPointsRouts, checkAddingPoint("range"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: wrongPointNameErrors.numberNearRange })
    });

    test("checking result === 'street'", () => {
        const newState = pointsReducer(stateFullPointsRouts, checkAddingPoint("street"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: wrongPointNameErrors.street })
    });

    test("checking result === 'other'", () => {
        const newState = pointsReducer(stateFullPointsRouts, checkAddingPoint("blabla"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: "" })
    });
})
