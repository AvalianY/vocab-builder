import { useEffect } from 'react';

import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  clearSession,
  finishSessionRestore,
  selectAccessToken,
  selectIsSessionReady,
  setCurrentUser,
} from '../../redux/sessionSlice';
import { useGetCurrentUserQuery } from '../../services/api/authApi';
import { removeStoredToken } from '../../utils/authStorage';

export function SessionBootstrap({ children }) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectAccessToken);
  const isSessionReady = useAppSelector(selectIsSessionReady);
  const { data, isError } = useGetCurrentUserQuery(undefined, {
    skip: !token || isSessionReady,
  });

  useEffect(() => {
    if (!token && !isSessionReady) {
      dispatch(finishSessionRestore());
    }
  }, [dispatch, isSessionReady, token]);

  useEffect(() => {
    if (data) {
      dispatch(
        setCurrentUser({
          _id: data._id,
          name: data.name,
          email: data.email,
        }),
      );
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (isError) {
      removeStoredToken();
      dispatch(clearSession());
    }
  }, [dispatch, isError]);

  return children;
}
