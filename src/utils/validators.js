export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateRequired = (value) => {
  return value?.trim().length > 0;
};

export const validatePhone = (phone) => {
  return phone?.trim().length >= 6;
};

export const validateUserForm = (data) => {
  const errors = {};

  if (!validateRequired(data.name)) {
    errors.name = 'Name is required';
  }

  if (!validateRequired(data.email)) {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Invalid email format';
  }

  if (!validateRequired(data.phone)) {
    errors.phone = 'Phone is required';
  } else if (!validatePhone(data.phone)) {
    errors.phone = 'Phone must be at least 6 characters';
  }

  if (!validateRequired(data.username)) {
    errors.username = 'Username is required';
  }

  if (!validateRequired(data.company?.name)) {
    errors.companyName = 'Company name is required';
  }

  if (!validateRequired(data.address?.city)) {
    errors.city = 'City is required';
  }

  return errors;
};
