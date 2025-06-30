
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/user/' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (userMongoId) => ({
        url: 'get',
        method: 'POST',
        body: { userMongoId },
      }),
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
