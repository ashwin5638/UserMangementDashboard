export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (value) => {
  return value?.trim().length > 0;
};

export const validateUserForm = (data) => {
  const errors = {};

  if (!validateRequired(data.firstName)) {
    errors.firstName = 'First name is required';
  }

  if (!validateRequired(data.lastName)) {
    errors.lastName = 'Last name is required';
  }

  if (!validateRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!validateRequired(data.department)) {
    errors.department = 'Department is required';
  }

  return errors;
};
