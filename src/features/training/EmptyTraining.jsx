import { Link } from 'react-router-dom';

import languageCardUrl from '../../assets/images/language-card.png';
import { ROUTES } from '../../routes/routePaths';

export function EmptyTraining() {
  return (
    <section className="empty-training" aria-labelledby="empty-training-title">
      <img
        className="empty-training__image"
        src={languageCardUrl}
        alt=""
        width="265"
        height="282"
      />
      <div className="empty-training__content">
        <h2 id="empty-training-title">
          You don&apos;t have a single word to learn right now.
        </h2>
        <p>
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>
        <div className="empty-training__actions">
          <Link
            className="empty-training__add"
            to={ROUTES.dictionary}
            state={{ openAddWord: true }}
          >
            Add word
          </Link>
          <Link className="empty-training__cancel" to={ROUTES.dictionary}>
            Cancel
          </Link>
        </div>
      </div>
    </section>
  );
}
