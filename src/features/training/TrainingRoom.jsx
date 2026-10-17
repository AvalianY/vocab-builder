import { Link } from 'react-router-dom';

import { Icon } from '../../components/Icon';
import { ROUTES } from '../../routes/routePaths';

function LanguageBadge({ language }) {
  const isEnglish = language === 'en';

  return (
    <span className="training-language">
      <Icon
        name={isEnglish ? 'flag-gb' : 'flag-ua'}
        width={32}
        height={32}
      />
      <span>{isEnglish ? 'English' : 'Ukrainian'}</span>
    </span>
  );
}

export function TrainingRoom({
  task,
  answer,
  onAnswerChange,
  onNext,
  onSave,
  isLastTask,
  isSaving,
}) {
  const answerLanguage = task.task;
  const promptLanguage = answerLanguage === 'en' ? 'ua' : 'en';
  const answerLanguageName =
    answerLanguage === 'en' ? 'English' : 'Ukrainian';

  return (
    <form className="training-form" onSubmit={onSave}>
      <div className="training-room">
        <div className="training-room__section training-room__answer">
          <label className="visually-hidden" htmlFor="training-answer">
            Translation in {answerLanguageName}
          </label>
          <input
            className="training-room__input"
            id="training-answer"
            type="text"
            value={answer}
            autoComplete="off"
            placeholder="Введіть переклад"
            onChange={(event) => onAnswerChange(event.target.value)}
          />

          {!isLastTask ? (
            <button
              className="training-room__next"
              type="button"
              onClick={onNext}
            >
              <span>Next</span>
              <Icon name="arrow-right" color="currentColor" />
            </button>
          ) : null}

          <LanguageBadge language={answerLanguage} />
        </div>

        <div className="training-room__section training-room__prompt">
          <p>{task[promptLanguage]}</p>
          <LanguageBadge language={promptLanguage} />
        </div>
      </div>

      <div className="training-form__actions">
        <button
          className="training-form__save"
          type="submit"
          disabled={isSaving}
        >
          Save
        </button>
        <Link className="training-form__cancel" to={ROUTES.dictionary}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
