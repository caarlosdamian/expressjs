export const createUserValidationSchema = {
  username: {
    isLength: {
      options: { min: 5, max: 30 },
      errorMessage: 'Must be at leas 5-30 characters',
    },
    notEmpty: {
      errorMessage: 'Must not be empty',
    },
    isString: {
      errorMessage: 'Must be string',
    },
  },
  displayName: {
    isLength: {
      options: { min: 5, max: 30 },
      errorMessage: 'Must be at leas 5-30 characters',
    },
    notEmpty: {
      errorMessage: 'Must not be empty',
    },
    isString: {
      errorMessage: 'Must be string',
    },
  },
  password: {
    notEmpty: {
      errorMessage: 'Must not be empty',
    },
  },
};
