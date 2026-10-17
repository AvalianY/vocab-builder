import { Icon } from '../Icon';

export function UserSummary({ name, light = false }) {
  return (
    <div className={`user-summary${light ? ' user-summary--light' : ''}`}>
      <span className="user-summary__name">{name}</span>
      <span className="user-summary__avatar" aria-hidden="true">
        <Icon name="user" color="currentColor" />
      </span>
    </div>
  );
}
