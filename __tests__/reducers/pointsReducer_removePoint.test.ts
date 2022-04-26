import { RemovePoint } from "../../src/store/actions/pointsActions";
import { pointsReducer } from "../../src/store/reducers/pointsReducer";
import { PointsState } from "../../src/types/pointsTypes";


let stateEmptyPointsRouts: PointsState;
let stateFullPointsRouts: PointsState;
let stateOnePoint: PointsState;

beforeEach(() => {
    stateEmptyPointsRouts = {
        points: [],
        routes: [],
        wrongPointError: "",
        isCorrectPoint: false,
        loading: false,
        isFetchFatal: false,
        isFetchError: false,
        errorCode: null
    };

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

    stateOnePoint = {
        points: [
            [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"]
        ],
        routes: [[55.824597, 49.121416]],
        wrongPointError: "",
        isCorrectPoint: false,
        loading: false,
        isFetchFatal: false,
        isFetchError: false,
        errorCode: null
    };
})


describe("points reducer - remove point", () => {

    // Positive tests.
    test("remove an existing point/route from a non-empty array of points/routes", () => {
        const newState = pointsReducer(stateFullPointsRouts, RemovePoint(1));
        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
            points: [
                [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
                [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
            ],
            routes: [[55.824597, 49.121416], [55.86692, 49.234451]]
        });
    });

    test("remove a non-existent point/route from a non-empty array of points/routes", () => {
        const newState = pointsReducer(stateFullPointsRouts, RemovePoint(5));

        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
            points: [
                [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
                [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"],
                [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
            ],
            routes: [[55.824597, 49.121416], [55.867223, 49.084747], [55.86692, 49.234451]]
        });
    });

    test("remove a point/route from an array of points/routes with one point", () => {
        const newState = pointsReducer(stateOnePoint, RemovePoint(0));
        expect(newState).toStrictEqual(stateEmptyPointsRouts);
    });

    // Negative tests.
    test("remove a point/route from an empty array of points/routes", () => {
        const newState = pointsReducer(stateEmptyPointsRouts, RemovePoint(5));
        expect(newState).toStrictEqual(stateEmptyPointsRouts);
    });

    test("a negative number is passed as an index", () => {
        const newState = pointsReducer(stateFullPointsRouts, RemovePoint(-1));
        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
            points: [
                [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
                [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"]
            ],
            routes: [[55.824597, 49.121416], [55.867223, 49.084747]]
        });
    });
})