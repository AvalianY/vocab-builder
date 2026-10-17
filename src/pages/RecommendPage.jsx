import { useCallback, useEffect, useMemo, useState } from 'react';

import { Dashboard } from '../components/Dashboard';
import { useNotification } from '../components/Notification';
import { Pagination } from '../components/Pagination';
import { WordsTable } from '../components/WordsTable';
import '../features/dictionary/dictionary.css';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import {
  useAddRecommendedWordMutation,
  useGetCategoriesQuery,
  useGetRecommendedWordsQuery,
  useGetStatisticsQuery,
} from '../services/api/wordsApi';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';

const WORDS_PER_PAGE = 7;

export function RecommendPage() {
  const { notify } = useNotification();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [isIrregular, setIsIrregular] = useState(false);
  const [page, setPage] = useState(1);
  const [addingId, setAddingId] = useState(null);
  const resetSearchPage = useCallback(() => setPage(1), []);
  const debouncedKeyword = useDebouncedValue(
    keyword.trim(),
    300,
    resetSearchPage,
  );

  const { data: categories = [], error: categoriesError } =
    useGetCategoriesQuery();
  const { data: statistics, error: statisticsError } =
    useGetStatisticsQuery();

  const query = useMemo(
    () => ({
      keyword: debouncedKeyword,
      category,
      isIrregular: category === 'verb' ? isIrregular : undefined,
      page,
      limit: WORDS_PER_PAGE,
    }),
    [category, debouncedKeyword, isIrregular, page],
  );

  const { data: wordsData, error: wordsError } =
    useGetRecommendedWordsQuery(query);
  const [addRecommendedWord] = useAddRecommendedWordMutation();
  const currentWordsCount = wordsData?.results?.length ?? 0;

  useEffect(() => {
    if (categoriesError) {
      notify(
        getApiErrorMessage(
          categoriesError,
          'Unable to load word categories. Please try again.',
        ),
      );
    }
  }, [categoriesError, notify]);

  useEffect(() => {
    if (statisticsError) {
      notify(
        getApiErrorMessage(
          statisticsError,
          'Unable to load dictionary statistics. Please try again.',
        ),
      );
    }
  }, [notify, statisticsError]);

  useEffect(() => {
    if (wordsError) {
      notify(
        getApiErrorMessage(
          wordsError,
          'Unable to load recommended words. Please try again.',
        ),
      );
    }
  }, [notify, wordsError]);

  const changeCategory = (nextCategory) => {
    setCategory(nextCategory);
    setIsIrregular(false);
    setPage(1);
  };

  const changeVerbType = (nextValue) => {
    setIsIrregular(nextValue);
    setPage(1);
  };

  const handleAdd = useCallback(
    async (word) => {
      setAddingId(word._id);

      try {
        await addRecommendedWord(word._id).unwrap();
        if (currentWordsCount === 1 && page > 1) {
          setPage((currentPage) => currentPage - 1);
        }
      } catch (error) {
        notify(
          getApiErrorMessage(
            error,
            'Unable to add the word to your dictionary. Please try again.',
          ),
        );
      } finally {
        setAddingId(null);
      }
    },
    [addRecommendedWord, currentWordsCount, notify, page],
  );

  return (
    <div className="dictionary-page">
      <div className="dictionary-page__container">
        <h1 className="visually-hidden">Recommend</h1>
        <Dashboard
          keyword={keyword}
          onKeywordChange={setKeyword}
          categories={categories}
          category={category}
          onCategoryChange={changeCategory}
          isIrregular={isIrregular}
          onVerbTypeChange={changeVerbType}
          totalCount={statistics?.totalCount ?? 0}
          idPrefix="recommend"
          ariaLabel="Recommended words tools"
        />

        <WordsTable
          words={wordsData?.results ?? []}
          variant="recommend"
          onAdd={handleAdd}
          addingId={addingId}
        />

        <Pagination
          page={wordsData?.page ?? page}
          totalPages={wordsData?.totalPages ?? 1}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
