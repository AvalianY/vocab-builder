function isReadableMessage(value) {
  if (typeof value !== 'string') {
    return false;
  }

  const message = value.trim();

  return (
    message.length > 0 &&
    message.length <= 240 &&
    !message.startsWith('{') &&
    !message.startsWith('[') &&
    !message.includes('\n    at ')
  );
}

export function getApiErrorMessage(error, fallback) {
  const backendMessage = error?.data?.message;

  if (isReadableMessage(backendMessage)) {
    return backendMessage.trim();
  }

  if (Array.isArray(backendMessage)) {
    const firstReadableMessage = backendMessage.find(isReadableMessage);

    if (firstReadableMessage) {
      return firstReadableMessage.trim();
    }
  }

  return fallback;
}
