export const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj) ?? '';
};

export const searchUsers = (users, term) => {
  if (!term.trim()) return users;
  const lower = term.toLowerCase();
  return users.filter(user =>
    user.name.toLowerCase().includes(lower) ||
    user.email.toLowerCase().includes(lower) ||
    (user.company?.name || '').toLowerCase().includes(lower)
  );
};

export const filterUsers = (users, filters) => {
  const hasActiveFilters = Object.values(filters).some(v => v?.trim());
  if (!hasActiveFilters) return users;

  return users.filter(user => {
    const nameMatch = !filters.name ||
      user.name.toLowerCase().includes(filters.name.toLowerCase());
    const emailMatch = !filters.email ||
      user.email.toLowerCase().includes(filters.email.toLowerCase());
    const companyMatch = !filters.company ||
      (user.company?.name || '').toLowerCase().includes(filters.company.toLowerCase());
    const cityMatch = !filters.city ||
      (user.address?.city || '').toLowerCase().includes(filters.city.toLowerCase());
    return nameMatch && emailMatch && companyMatch && cityMatch;
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
