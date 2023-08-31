import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import { store } from './store/Store.jsx';
// const stytchTest = new StytchUIClient(
//   "public-token-test-6b62a560-fb54-42e5-85ca-cab49d61b0bd"
// );

const queryClient = new QueryClient();
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          {/* <StytchProvider stytch={stytchTest}> */}
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          {/* </StytchProvider> */}
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
