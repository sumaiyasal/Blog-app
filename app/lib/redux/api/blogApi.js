// app/lib/redux/api/blogApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/post', // All routes relative to /api/post
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (postData) => ({
        url: 'create',
        method: 'POST',
        body: postData,
      }),
    }),
    getPosts: builder.query({
    query: ({ limit = 3, order = 'desc' }) => ({
    url: 'get',
    method: 'POST',
    body: { limit, order },
  }),
}),
    getPostBySlug: builder.mutation({
      query: (slug) => ({
        url: 'get',
        method: 'POST',
        body: { slug },
      }),
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: 'delete',
        method: 'DELETE',
        body: { id: postId },
      }),
    }),
searchPosts: builder.mutation({
  query: (filters) => {
    const { category, ...rest } = filters;
    const body = {
      ...rest,
      ...(category && category !== 'all' && { category }),
    };

    return {
      url: 'get',
      method: 'POST',
      body,
    };
  },
}),

    updatePost: builder.mutation({
      query: (data) => ({
        url: 'update',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreatePostMutation,
  useSearchPostsMutation,
  useGetPostsQuery,
  useGetPostBySlugMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = blogApi;
