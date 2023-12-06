import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SnackbarProvider maxSnack={3}>
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>
);
