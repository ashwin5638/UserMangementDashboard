export const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj) ?? '';
};

export const searchUsers = (users, term) => {
  if (!term.trim()) return users;
  const lower = term.toLowerCase();
  return users.filter(user =>
    user.firstName.toLowerCase().includes(lower) ||
    user.lastName.toLowerCase().includes(lower) ||
    user.email.toLowerCase().includes(lower)
  );
};

export const filterUsers = (users, filters) => {
  const hasActiveFilters = Object.values(filters).some(v => v?.trim());
  if (!hasActiveFilters) return users;

  return users.filter(user => {
    const firstNameMatch = !filters.firstName ||
      user.firstName.toLowerCase().includes(filters.firstName.toLowerCase());
    const lastNameMatch = !filters.lastName ||
      user.lastName.toLowerCase().includes(filters.lastName.toLowerCase());
    const emailMatch = !filters.email ||
      user.email.toLowerCase().includes(filters.email.toLowerCase());
    const deptMatch = !filters.department ||
      user.department.toLowerCase().includes(filters.department.toLowerCase());
    return firstNameMatch && lastNameMatch && emailMatch && deptMatch;
  });
};

export const sortUsers = (users, field, direction) => {
  if (!field) return users;
  return [...users].sort((a, b) => {
    const aVal = getNestedValue(a, field);
    const bVal = getNestedValue(b, field);
    const cmp = String(aVal).localeCompare(String(bVal), undefined, { sensitivity: 'base' });
    return direction === 'asc' ? cmp : -cmp;
  });
};
