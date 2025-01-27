// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.js";
import "./i18n.ts";

import { persistor, store } from "./redux/store.ts";
import { LanguageInitializer } from "./components";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <LanguageInitializer />
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
  // </StrictMode>
);
