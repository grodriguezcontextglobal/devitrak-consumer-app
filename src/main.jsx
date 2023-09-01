import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import './index.css'
import { store } from './store/store.jsx';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter basename={import.meta.env.DEV ? '/' : '/devitrak-consumer-app/'}>
        <PersistGate persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
        </PersistGate>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
