import { configureStore } from '@reduxjs/toolkit';
import { vnuApi } from './api';

const store = configureStore({
  reducer: {
    [vnuApi.reducerPath]: vnuApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(vnuApi.middleware),
});
export default store;
