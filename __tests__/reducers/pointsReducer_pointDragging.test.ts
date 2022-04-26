import { PointDragging } from "../../src/store/actions/pointsActions";
import { pointsReducer } from "../../src/store/reducers/pointsReducer";
import { PointsState } from "../../src/types/pointsTypes";


let stateFullPointsRouts: PointsState;

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

describe("points reducer - drag and drop point", () => {
    test("dragging point to_index<from_index ", () => {
        const newState = pointsReducer(stateFullPointsRouts, PointDragging(0, 1));
        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
            points: [
                [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"],
                [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
                [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
            ],
            routes: [[55.867223, 49.084747], [55.824597, 49.121416], [55.86692, 49.234451]],
        });
    });

    test("dragging point to_index>from_index ", () => {
        const newState = pointsReducer(stateFullPointsRouts, PointDragging(2, 0));
        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
            points: [
                [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"],
                [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
                [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"]
            ],
            routes: [[55.86692, 49.234451], [55.824597, 49.121416], [55.867223, 49.084747]],
        });
    });

    test("dragging point to_index===from_index ", () => {
        const newState = pointsReducer(stateFullPointsRouts, PointDragging(2, 2));
        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
        });
    });
})

