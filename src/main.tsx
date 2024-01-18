import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";

import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./store/store.ts";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <SnackbarProvider maxSnack={3}>

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </SnackbarProvider>,
);
