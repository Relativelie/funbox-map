import { changePointCoordinates } from "../../src/store/actions/pointsActions";
import { pointsReducer } from "../../src/store/reducers/pointsReducer";
import { stateEmptyPointsRouts, stateFullPointsRouts } from "./stateVariables";



describe("point reducer - change coordinates", () => {

    // Positive tests.
    test("change coordinates of an existing point/route", () => {
        const newState = pointsReducer(stateFullPointsRouts,
            changePointCoordinates(
                0,
                [55.83446264982311, 49.15107729101557],
                'Россия, Республика Татарстан, Казань, Ново-Савиновский район, 27-й квартал')
        );

        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
            points: [
                [[55.83446264982311, 49.15107729101557], "Россия, Республика Татарстан, Казань, Ново-Савиновский район, 27-й квартал"],
                [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"],
                [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
            ],
            routes: [[55.83446264982311, 49.15107729101557], [55.867223, 49.084747], [55.86692, 49.234451]]
        });
    })


    // Negative tests
    test("change coordinates of a non-existent point/route", () => {
        const newState = pointsReducer(stateFullPointsRouts,
            changePointCoordinates(
                5,
                [55.83446264982311, 49.15107729101557],
                'Россия, Республика Татарстан, Казань, Ново-Савиновский район, 27-й квартал')
        );

        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
            points: [
                [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
                [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"],
                [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
            ],
            routes: [[55.824597, 49.121416], [55.867223, 49.084747], [55.86692, 49.234451]]
        });

    })


    test("a negative number is passed as an index", () => {
        const newState = pointsReducer(stateFullPointsRouts,
            changePointCoordinates(
                -1,
                [55.83446264982311, 49.15107729101557],
                'Россия, Республика Татарстан, Казань, Ново-Савиновский район, 27-й квартал')
        );

        expect(newState).toStrictEqual({
            ...stateFullPointsRouts,
            points: [
                [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
                [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"],
                [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
            ],
            routes: [[55.824597, 49.121416], [55.867223, 49.084747], [55.86692, 49.234451]]
        });

    })

    test("empty points/routes", () => {
        const newState = pointsReducer(stateEmptyPointsRouts,
            changePointCoordinates(
                0,
                [55.83446264982311, 49.15107729101557],
                'Россия, Республика Татарстан, Казань, Ново-Савиновский район, 27-й квартал')
        );

        expect(newState).toStrictEqual(stateEmptyPointsRouts);
    })

})
