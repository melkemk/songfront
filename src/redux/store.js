
import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { songReducer } from './songSlice';
import songSaga from './songSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    song:songReducer
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(songSaga);

export default store;
