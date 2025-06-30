import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './api/blogApi';
import { userApi } from './api/userApi';


export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(userApi.middleware),
});
