import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import consumerSlide from "./slides/consumerSlide";
import deviceSlides from "./slides/deviceSlides";
import eventSlide from "./slides/eventSlide";
import articleHandlerSlide from "./slides/articleHandlerSlide";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  consumer: consumerSlide,
  deviceHandler: deviceSlides,
  event:eventSlide,
  articleHandler: articleHandlerSlide,
});

const persistedReducers = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
