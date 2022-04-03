import { FC } from "react";

import { Error } from "../errors/Error";
import { MyMap } from "../map/MyMap";
import { Menu } from "../menu/Menu";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import './App.scss'


const App: FC = () => {


  const { isFetchError, isFetchFatal, errorCode } = useTypedSelector(state => state.points);

  if (isFetchFatal) {
    return <Error errorType={["fatal", null]} />
  }
  else if (isFetchError) {
    return <Error errorType={["error", errorCode]} />
  }
  else {
    return (
      <div className="App">
        <MyMap />
        <Menu />
      </div>
    );
  }

}

export default App;
