import { FC } from "react";
import { Provider } from "react-redux";

import { MyMap } from "./components/map/MyMap";
import { Menu } from "./components/menu/Menu";
import { store } from "./store";

import './styles/scss/style.scss'


const App: FC = () => {

  return (
    <Provider store={store}>
    <div className="App">
      {/* <MyMap /> */}
      {/* <Menu /> */}
    </div>
    </Provider>

  );
}

export default App;
