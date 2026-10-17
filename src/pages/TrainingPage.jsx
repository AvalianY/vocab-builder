import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '../components/Notification';
import { ProgressBar } from '../components/ProgressBar';
import { EmptyTraining } from '../features/training/EmptyTraining';
import { TrainingRoom } from '../features/training/TrainingRoom';
import { WellDoneModal } from '../features/training/WellDoneModal';
import '../features/training/training.css';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  selectAccessToken,
  selectIsSessionReady,
} from '../redux/sessionSlice';
import { ROUTES } from '../routes/routePaths';
import {
  useGetTrainingTasksQuery,
  useSubmitTrainingAnswersMutation,
} from '../services/api/wordsApi';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';

function createAnswer(task, value) {
  const answer = value.trim();

  if (!answer) {
    return null;
  }

  return {
    _id: task._id,
    ...(task.en ? { en: task.en } : {}),
    ...(task.ua ? { ua: task.ua } : {}),
    task: task.task,
    [task.task]: answer,
  };
}

export function TrainingPage() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const token = useAppSelector(selectAccessToken);
  const isSessionReady = useAppSelector(selectIsSessionReady);
  const {
    data: tasks = [],
    error,
    isFetching,
    isLoading,
    isSuccess,
  } = useGetTrainingTasksQuery(undefined, {
    skip: !isSessionReady || !token,
    refetchOnMountOrArgChange: true,
  });
  const [submitTrainingAnswers, { isLoading: isSaving }] =
    useSubmitTrainingAnswersMutation();
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const currentTask = tasks[currentTaskIndex];
  const progress = tasks.length > 0 ? (answers.length / tasks.length) * 100 : 0;
  const showLoading =
    (isLoading || isFetching) && (!isSuccess || tasks.length === 0);

  useEffect(() => {
    if (error) {
      notify(
        getApiErrorMessage(
          error,
          'Unable to load training tasks. Please try again.',
        ),
      );
    }
  }, [error, notify]);

  const handleNext = () => {
    const currentAnswer = createAnswer(currentTask, answer);

    if (currentAnswer) {
      setAnswers((storedAnswers) => [...storedAnswers, currentAnswer]);
    }

    setAnswer('');
    setCurrentTaskIndex((index) => index + 1);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const currentAnswer = createAnswer(currentTask, answer);
    const submittedAnswers = currentAnswer
      ? [...answers, currentAnswer]
      : answers;

    try {
      const response = await submitTrainingAnswers(submittedAnswers).unwrap();
      setResults(response);
    } catch (submissionError) {
      notify(
        getApiErrorMessage(
          submissionError,
          'Your current training progress was not saved. Please try again.',
        ),
      );
      navigate(ROUTES.dictionary, { replace: true });
    }
  };

  const finishTraining = () => {
    setResults(null);
    navigate(ROUTES.dictionary, { replace: true });
  };

  return (
    <div className="training-page">
      <div className="training-page__container">
        <h1 className="visually-hidden">Training</h1>

        {showLoading ? (
          <p className="training-page__status" role="status">
            Loading training...
          </p>
        ) : null}

        {isSuccess && tasks.length > 0 ? (
          <>
            <div className="training-page__progress">
              <ProgressBar
                value={progress}
                variant="training"
                displayValue={answers.length}
                ariaLabel={`${answers.length} of ${tasks.length} answers completed`}
              />
            </div>
            <TrainingRoom
              task={currentTask}
              answer={answer}
              onAnswerChange={setAnswer}
              onNext={handleNext}
              onSave={handleSave}
              isLastTask={currentTaskIndex === tasks.length - 1}
              isSaving={isSaving}
            />
          </>
        ) : null}

        {isSuccess && !isFetching && tasks.length === 0 ? (
          <EmptyTraining />
        ) : null}
      </div>

      {results ? (
        <WellDoneModal results={results} onClose={finishTraining} />
      ) : null}
    </div>
  );
}
