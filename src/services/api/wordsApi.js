import { baseApi } from './baseApi';

const OWN_WORDS_TAG = { type: 'OwnWords', id: 'LIST' };
const RECOMMENDED_WORDS_TAG = { type: 'RecommendedWords', id: 'LIST' };

export const wordsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => '/words/categories',
      providesTags: ['Categories'],
      keepUnusedDataFor: 3600,
    }),
    getOwnWords: builder.query({
      query: ({ keyword, category, isIrregular, page = 1, limit = 7 }) => ({
        url: '/words/own',
        params: {
          ...(keyword ? { keyword } : {}),
          ...(category ? { category } : {}),
          ...(typeof isIrregular === 'boolean' ? { isIrregular } : {}),
          page,
          limit,
        },
      }),
      providesTags: (result) => [
        OWN_WORDS_TAG,
        ...(result?.results ?? []).map(({ _id }) => ({
          type: 'OwnWords',
          id: _id,
        })),
      ],
    }),
    getRecommendedWords: builder.query({
      query: ({ keyword, category, isIrregular, page = 1, limit = 7 }) => ({
        url: '/words/all',
        params: {
          ...(keyword ? { keyword } : {}),
          ...(category ? { category } : {}),
          ...(typeof isIrregular === 'boolean' ? { isIrregular } : {}),
          page,
          limit,
        },
      }),
      providesTags: (result) => [
        RECOMMENDED_WORDS_TAG,
        ...(result?.results ?? []).map(({ _id }) => ({
          type: 'RecommendedWords',
          id: _id,
        })),
      ],
    }),
    getStatistics: builder.query({
      query: () => '/words/statistics',
      providesTags: ['Statistics'],
    }),
    getTrainingTasks: builder.query({
      query: () => '/words/tasks',
      transformResponse: (response) => response.tasks,
      providesTags: ['TrainingTasks'],
    }),
    createWord: builder.mutation({
      query: (word) => ({
        url: '/words/create',
        method: 'POST',
        body: word,
      }),
      invalidatesTags: [OWN_WORDS_TAG, 'Statistics', 'TrainingTasks'],
    }),
    addRecommendedWord: builder.mutation({
      query: (id) => ({
        url: `/words/add/${id}`,
        method: 'POST',
      }),
      invalidatesTags: [
        RECOMMENDED_WORDS_TAG,
        OWN_WORDS_TAG,
        'Statistics',
        'TrainingTasks',
      ],
    }),
    editWord: builder.mutation({
      query: ({ id, ...word }) => ({
        url: `/words/edit/${id}`,
        method: 'PATCH',
        body: word,
      }),
      invalidatesTags: (result, error, { id }) => [
        OWN_WORDS_TAG,
        { type: 'OwnWords', id },
        'TrainingTasks',
      ],
    }),
    deleteWord: builder.mutation({
      query: (id) => ({
        url: `/words/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [OWN_WORDS_TAG, 'Statistics', 'TrainingTasks'],
    }),
    submitTrainingAnswers: builder.mutation({
      query: (answers) => ({
        url: '/words/answers',
        method: 'POST',
        body: answers,
      }),
      invalidatesTags: [OWN_WORDS_TAG, 'Statistics', 'TrainingTasks'],
    }),
  }),
});

export const {
  useAddRecommendedWordMutation,
  useCreateWordMutation,
  useDeleteWordMutation,
  useEditWordMutation,
  useGetCategoriesQuery,
  useGetOwnWordsQuery,
  useGetRecommendedWordsQuery,
  useGetStatisticsQuery,
  useGetTrainingTasksQuery,
  useSubmitTrainingAnswersMutation,
} = wordsApi;
