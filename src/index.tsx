import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, HashRouter} from "react-router-dom";
import './index.css'
import {App} from './App';
import {store} from "./redux/store";
import {Provider} from "react-redux";

const rootElement = document.getElementById('root') as HTMLElement

  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <HashRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </HashRouter>
  )

