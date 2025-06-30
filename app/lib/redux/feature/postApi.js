// // app/lib/redux/features/postApi.js
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const postApi = createApi({
//   reducerPath: 'postApi',
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000' }),
//   endpoints: (builder) => ({
//     getPostBySlug: builder.mutation({
//       query: (slug) => ({
//         url: '/api/post/get',
//         method: 'POST',
//         body: { slug },
//       }),
//     }),
//   }),
// });

// export const { useGetPostBySlugMutation } = postApi;
