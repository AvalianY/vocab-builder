import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Dashboard } from '../components/Dashboard';
import { useNotification } from '../components/Notification';
import { Pagination } from '../components/Pagination';
import { WordsTable } from '../components/WordsTable';
import { AddWordModal } from '../features/dictionary/AddWordModal';
import { EditWordModal } from '../features/dictionary/EditWordModal';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import {
  useDeleteWordMutation,
  useGetCategoriesQuery,
  useGetOwnWordsQuery,
  useGetStatisticsQuery,
} from '../services/api/wordsApi';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';
import '../features/dictionary/dictionary.css';

const WORDS_PER_PAGE = 7;

export function DictionaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { notify } = useNotification();
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [isIrregular, setIsIrregular] = useState(false);
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(
    Boolean(location.state?.openAddWord),
  );
  const [editingWord, setEditingWord] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const resetSearchPage = useCallback(() => setPage(1), []);
  const debouncedKeyword = useDebouncedValue(
    keyword.trim(),
    300,
    resetSearchPage,
  );

  const {
    data: categories = [],
    error: categoriesError,
  } = useGetCategoriesQuery();
  const {
    data: statistics,
    error: statisticsError,
  } = useGetStatisticsQuery();

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

  const { data: wordsData, error: wordsError } = useGetOwnWordsQuery(query);
  const [deleteWord] = useDeleteWordMutation();
  const currentWordsCount = wordsData?.results?.length ?? 0;

  useEffect(() => {
    if (location.state?.openAddWord) {
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

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
        getApiErrorMessage(wordsError, 'Unable to load words. Please try again.'),
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

  const handleDelete = useCallback(
    async (word) => {
      setDeletingId(word._id);

      try {
        await deleteWord(word._id).unwrap();
        if (currentWordsCount === 1 && page > 1) {
          setPage((currentPage) => currentPage - 1);
        }
      } catch (error) {
        notify(
          getApiErrorMessage(error, 'Unable to delete the word. Please try again.'),
        );
      } finally {
        setDeletingId(null);
      }
    },
    [currentWordsCount, deleteWord, notify, page],
  );

  const handleEdit = useCallback((word) => {
    setEditingWord(word);
  }, []);

  return (
    <div className="dictionary-page">
      <div className="dictionary-page__container">
        <h1 className="visually-hidden">Dictionary</h1>
        <Dashboard
          keyword={keyword}
          onKeywordChange={setKeyword}
          categories={categories}
          category={category}
          onCategoryChange={changeCategory}
          isIrregular={isIrregular}
          onVerbTypeChange={changeVerbType}
          totalCount={statistics?.totalCount ?? 0}
          onAddWord={() => setIsAddModalOpen(true)}
        />

        <WordsTable
          words={wordsData?.results ?? []}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deletingId={deletingId}
        />

        <Pagination
          page={wordsData?.page ?? page}
          totalPages={wordsData?.totalPages ?? 1}
          onPageChange={setPage}
        />
      </div>

      {isAddModalOpen ? (
        <AddWordModal
          categories={categories}
          onClose={() => setIsAddModalOpen(false)}
        />
      ) : null}

      {editingWord ? (
        <EditWordModal word={editingWord} onClose={() => setEditingWord(null)} />
      ) : null}
    </div>
  );
}
