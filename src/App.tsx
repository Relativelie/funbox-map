import { FC } from "react";

import { MyMap } from "./components/map/MyMap";
import { Menu } from "./components/menu/Menu";

import './styles/scss/style.scss'


const App: FC = () => {

  return (
    <div className="App">
      <MyMap />
      <Menu />
    </div>
  );
}

export default App;
