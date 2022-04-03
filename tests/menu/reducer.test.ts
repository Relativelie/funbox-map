import { removePoint } from "../../src/store/actions/pointsActions";
import { pointsReducer } from "../../src/store/reducers/pointsReducer";
import { PointsState } from "../../src/types/pointsTypes"


test("", () => {
    const state: PointsState = {
        points: [
            [[55.824597, 49.121416], "Россия, Республика Татарстан, Казань, улица Четаева, 35"],
            [[55.867223, 49.084747], "Россия, Республика Татарстан, Казань, Авиастроительный район, улица Чапаева, 24"],
            [[55.86692, 49.234451], "Россия, Республика Татарстан, Казань, Советский район, посёлок Дербышки, улица Мира, 1"]
        ],
        routes: [[55.824597, 49.121416], [55.867223, 49.084747], [55.86692, 49.234451]],
        wrongPointError: "",
        isCorrectPoint: null,
        loading: false,
        isFetchFatal: false,
        isFetchError: false,
        errorCode: null
    };

    

    pointsReducer(state, removePoint(0))


})