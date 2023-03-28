import { applyMiddleware, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import counterSlice from '../reducers/counterSlice';

export default function configureAppStore(preloadedState = {}) {
  const composeEnhancers = process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

  const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

  const store = configureStore({
    reducer: {
      counter: counterSlice,
    },
    middleware: () => getDefaultMiddleware(),
    preloadedState,
    enhancer,
  });

  return store;
}
