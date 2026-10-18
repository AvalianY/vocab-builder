import { Brand } from '../components/Brand';
import { Icon } from '../components/Icon';
import peopleReading from '../assets/images/people-reading.png';
import './auth-layout.css';

export function AuthLayout({ children, mode }) {
  return (
    <div className={`auth-page auth-page--${mode}`}>
      <Icon
        className="auth-page__background auth-page__background--tablet"
        name="auth-background-tablet"
      />
      <Icon
        className="auth-page__background auth-page__background--desktop"
        name="auth-background-desktop"
      />
      <header className="auth-page__header">
        <Brand />
      </header>

      <main className="auth-page__main">
        <div className="auth-visual" aria-hidden="true">
          <img
            className="auth-visual__image"
            src={peopleReading}
            alt=""
            width="498"
            height="435"
          />
          <p className="auth-visual__caption">
            Word · Translation · Grammar · Progress
          </p>
        </div>
        {children}
      </main>
    </div>
  );
}
