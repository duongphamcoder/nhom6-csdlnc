import React, { createContext } from "react";
import ReactDOM from "react-dom";
import * as ReactDOMClient  from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import Router from "./route";


import "bootstrap/dist/css/bootstrap.min.css";
import "./common.scss";

import management_state from "./management_state";

export const HandleContext = createContext();

const root = ReactDOMClient .createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HandleContext.Provider value={management_state}>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </HandleContext.Provider>
  </React.StrictMode>
);
