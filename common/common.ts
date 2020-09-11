export const getRootUrl = (): string => {
  let result = 'http://localhost:3000/api';

  const environment = process.env.NODE_ENV;
  if (environment === 'development') {
    result = 'http://localhost:3000/api';
  } else {
    result = 'https://coders-mojo-backend.herokuapp.com/api';
  }

  return result;
};

export const validateEmail = (email: string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};
