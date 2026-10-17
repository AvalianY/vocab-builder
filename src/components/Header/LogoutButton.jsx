import { useNotification } from '../Notification';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { clearSession } from '../../redux/sessionSlice';
import { baseApi } from '../../services/api/baseApi';
import { useLogoutMutation } from '../../services/api/authApi';
import { removeStoredToken } from '../../utils/authStorage';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';
import { Icon } from '../Icon';

export function LogoutButton({ onComplete }) {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (error) {
      notify(
        getApiErrorMessage(
          error,
          'The server did not respond, but you have been logged out on this device.',
        ),
      );
    } finally {
      removeStoredToken();
      dispatch(clearSession());
      dispatch(baseApi.util.resetApiState());
      onComplete?.();
    }
  };

  return (
    <button
      className="logout-button"
      type="button"
      disabled={isLoading}
      onClick={handleLogout}
    >
      <span>Log out</span>
      <Icon name="arrow-right" color="currentColor" />
    </button>
  );
}
