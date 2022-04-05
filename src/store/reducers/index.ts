import {combineReducers} from "redux";
import { pointsReducer } from "./pointsReducer";


export const reducers = {
    points: pointsReducer
}


export const rootReducer = combineReducers(
    reducers
)

export type RootState = ReturnType<typeof rootReducer>