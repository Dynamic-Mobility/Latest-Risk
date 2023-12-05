import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "devextreme/dist/css/dx.material.blue.light.css";
import "./theme/devextreme.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from './theme/datagrid';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ToastContainer />
    </Provider>
  </React.StrictMode>
);
