import { PointsState } from "../../src/types/pointsTypes";


export const stateFullPointsRouts: PointsState = {
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

export const stateEmptyPointsRouts: PointsState = {
    points: [],
    routes: [],
    wrongPointError: "",
    isCorrectPoint: false,
    loading: false,
    isFetchFatal: false,
    isFetchError: false,
    errorCode: null
};

export const stateOnePoint: PointsState = {
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


export const forAddPoints: PointsState = {
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

export const forAddPointsEmptyPoints: PointsState = {
    points: [],
    routes: [],
    wrongPointError: "",
    isCorrectPoint: false,
    loading: true,
    isFetchFatal: true,
    isFetchError: true,
    errorCode: null
};