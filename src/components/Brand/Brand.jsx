import { Link } from 'react-router-dom';

import logoMark from '../../assets/images/logo-mark.svg';
import { ROUTES } from '../../routes/routePaths';
import './brand.css';

export function Brand({ light = false, linked = false }) {
  const content = (
    <>
      <img className="brand__mark" src={logoMark} alt="" width="40" height="40" />
      <span className="brand__name">VocabBuilder</span>
    </>
  );

  if (linked) {
    return (
      <Link
        className={`brand${light ? ' brand--light' : ''}`}
        to={ROUTES.dictionary}
        aria-label="VocabBuilder home"
      >
        {content}
      </Link>
    );
  }

  return <div className={`brand${light ? ' brand--light' : ''}`}>{content}</div>;
}
