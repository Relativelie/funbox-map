import { CheckAddingPoint } from "../../src/store/actions/pointsActions";
import { pointsReducer } from "../../src/store/reducers/pointsReducer";
import { wrongPointNameErrors } from "../../src/store/reducers/wrongPointNameErrors";
import { PointsState } from "../../src/types/pointsTypes";


let stateFullPointsRouts: PointsState

beforeEach(() => {
    stateFullPointsRouts = {
        points: [
            [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
            [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"],
            [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
        ],
        routes: [[55.824597, 49.121416], [55.867223, 49.084747], [55.86692, 49.234451]],
        wrongPointError: "",
        isCorrectPoint: false,
        loading: false,
        isFetchFatal: false,
        isFetchError: false,
        errorCode: null
    };
})


describe("points reducer - check adding point name", () => {
    // Positive tests.
    test("checking result === 'exact'", () => {
        const newState = pointsReducer(stateFullPointsRouts, CheckAddingPoint("exact"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, isCorrectPoint: true })
    });

    test("checking result === 'number'", () => {
        const newState = pointsReducer(stateFullPointsRouts, CheckAddingPoint("number"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: wrongPointNameErrors.numberNearRange })
    });

    test("checking result === 'near'", () => {
        const newState = pointsReducer(stateFullPointsRouts, CheckAddingPoint("near"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: wrongPointNameErrors.numberNearRange })
    });

    test("checking result === 'range'", () => {
        const newState = pointsReducer(stateFullPointsRouts, CheckAddingPoint("range"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: wrongPointNameErrors.numberNearRange })
    });

    test("checking result === 'street'", () => {
        const newState = pointsReducer(stateFullPointsRouts, CheckAddingPoint("street"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: wrongPointNameErrors.street })
    });

    test("checking result === 'other'", () => {
        const newState = pointsReducer(stateFullPointsRouts, CheckAddingPoint("blabla"));
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, wrongPointError: "" })
    });
})
