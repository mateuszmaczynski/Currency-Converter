import { StrictMode } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import { persistData, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

const rootElement = document.getElementById("root");
render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistData}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  rootElement
);
