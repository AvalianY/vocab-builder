const AUTH_TOKEN_KEY = 'vocab-builder-token';

export function getStoredToken() {
  try {
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function storeToken(token) {
  try {
    window.localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    return;
  }
}

export function removeStoredToken() {
  try {
    window.localStorage.removeItem(AUTH_TOKEN_KEY);
  } catch {
    return;
  }
}
