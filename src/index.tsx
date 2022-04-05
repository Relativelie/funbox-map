import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';

import App from './components/app/App';
import { store } from './store';
import { removePoint } from './store/actions/pointsActions';
import { pointsReducer } from './store/reducers/pointsReducer';




  const state:any = {
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
      // const { removePoint } = useActions();
      const newState = pointsReducer(state, removePoint(0))
      console.log(newState.points)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
