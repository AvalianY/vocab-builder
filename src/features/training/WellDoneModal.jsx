import openBookUrl from '../../assets/images/open-book.png';
import { Icon } from '../../components/Icon';
import { Modal } from '../../components/Modal';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectCurrentUser } from '../../redux/sessionSlice';

function ResultList({ title, results }) {
  return (
    <section className="well-done__column">
      <h3>{title}</h3>
      <ul>
        {results.map((result) => (
          <li key={`${result._id}-${result.task}`}>
            {result.en || result.ua}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function WellDoneModal({ results, onClose }) {
  const user = useAppSelector(selectCurrentUser);
  const correctAnswers = results.filter((result) => result.isDone);
  const mistakes = results.filter((result) => !result.isDone);

  return (
    <Modal
      ariaLabel="Training results"
      backdropClassName="well-done-backdrop"
      className="well-done-modal"
      mobileCloseIcon="chevron-down"
      onClose={onClose}
    >
      <div className="well-done__mobile-user">
        <span className="well-done__avatar" aria-hidden="true">
          <Icon name="user" color="currentColor" />
        </span>
        <span className="well-done__user-name">{user?.name || 'User'}</span>
      </div>

      <img
        className="well-done__image"
        src={openBookUrl}
        alt=""
        width="212"
        height="179"
      />
      <h2 className="well-done__title">Well done</h2>
      <div className="well-done__results">
        <ResultList title="Correct answers:" results={correctAnswers} />
        <ResultList title="Mistakes:" results={mistakes} />
      </div>
    </Modal>
  );
}
