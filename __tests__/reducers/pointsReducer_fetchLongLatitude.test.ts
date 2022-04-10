import { fetchLongLatitudeBegin,
    fetchLongLatitudeError,
    fetchLongLatitudeFatal,
    fetchLongLatitudeSuccess } from "../../src/store/actions/pointsActions";
import { pointsReducer } from "../../src/store/reducers/pointsReducer";
import { PointsState } from "../../src/types/pointsTypes";


let stateFullPointsRouts: PointsState;
let forAddPoints: PointsState;
let forAddPointsEmptyPoints: PointsState;
let stateEmptyPointsRouts: PointsState;

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

    forAddPoints = {
        points: [
            [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
            [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"],
            [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
        ],
        routes: [[55.824597, 49.121416], [55.867223, 49.084747], [55.86692, 49.234451]],
        wrongPointError: "",
        isCorrectPoint: false,
        loading: true,
        isFetchFatal: false,
        isFetchError: false,
        errorCode: null
    };

    forAddPointsEmptyPoints = {
        points: [],
        routes: [],
        wrongPointError: "",
        isCorrectPoint: false,
        loading: true,
        isFetchFatal: true,
        isFetchError: true,
        errorCode: null
    };

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
})



describe("points reducer - fetch longitude and latitude", () => {
    test("fetch begin with existing points", () => {
        const newState = pointsReducer(stateFullPointsRouts, fetchLongLatitudeBegin());
        expect(newState).toStrictEqual({ ...stateFullPointsRouts, loading: true });
    });

    test("fetch begin with empty points in array", () => {
        const newState = pointsReducer(stateEmptyPointsRouts, fetchLongLatitudeBegin());
        expect(newState).toStrictEqual({ ...stateEmptyPointsRouts, loading: true });
    });

    test("fetch fatal with existing points", () => {
        const newState = pointsReducer(forAddPoints, fetchLongLatitudeFatal());
        expect(newState).toStrictEqual({ ...forAddPoints, loading: false, isFetchFatal: true });
    });

    test("fetch fatal with empty points in array", () => {
        const newState = pointsReducer(stateEmptyPointsRouts, fetchLongLatitudeFatal());
        expect(newState).toStrictEqual({ ...stateEmptyPointsRouts, loading: false, isFetchFatal: true });
    });

    test("fetch error with existing points", () => {
        const newState = pointsReducer(forAddPoints, fetchLongLatitudeError(404));
        expect(newState).toStrictEqual({ ...forAddPoints, loading: false, isFetchError: true, errorCode: 404 });
    });

    test("fetch error with empty points in array", () => {
        const newState = pointsReducer(stateEmptyPointsRouts, fetchLongLatitudeError(404));
        expect(newState).toStrictEqual({ ...stateEmptyPointsRouts, loading: false, isFetchError: true, errorCode: 404 });
    });

    test("fetch success with existing points", () => {
        const newState = pointsReducer(stateFullPointsRouts,
            fetchLongLatitudeSuccess([[55.821805, 49.149704], 'Россия, Республика Татарстан, Казань, улица Четаева, 4']));
        expect(newState).toStrictEqual(
            {
                ...stateFullPointsRouts,
                loading: false,
                isCorrectPoint: false,
                wrongPointError: "",
                points: [
                    ...stateFullPointsRouts.points,
                    [[55.821805, 49.149704], 'Россия, Республика Татарстан, Казань, улица Четаева, 4']
                ],
                routes: [[55.824597, 49.121416], [55.867223, 49.084747], [55.86692, 49.234451], [55.821805, 49.149704]]
            });
    });

    test("fetch success with empty points in array", () => {
        const newState = pointsReducer(forAddPointsEmptyPoints,
            fetchLongLatitudeSuccess([[55.821805, 49.149704], 'Россия, Республика Татарстан, Казань, улица Четаева, 4']));
        expect(newState).toStrictEqual(
            {
                ...forAddPointsEmptyPoints,
                loading: false,
                isCorrectPoint: false,
                wrongPointError: "",
                points: [
                    [[55.821805, 49.149704], 'Россия, Республика Татарстан, Казань, улица Четаева, 4']
                ],
                routes: [[55.821805, 49.149704]]
            });
    });
})

