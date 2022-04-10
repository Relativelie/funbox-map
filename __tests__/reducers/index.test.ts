import { reducers } from "../../src/store/reducers";
import { pointsReducer } from "../../src/store/reducers/pointsReducer";


test("necessary reducers ​​are prepared", () => {
    expect(reducers.points).toEqual(pointsReducer);
});
