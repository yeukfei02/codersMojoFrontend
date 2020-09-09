export const getRootUrl = (): string => {
  let result = 'http://localhost:3000/api';

  const environment = process.env.NODE_ENV;
  if (environment === 'development') {
    result = 'http://localhost:3000/api';
  } else {
    result = 'http://localhost:3000/api';
  }

  return result;
};
