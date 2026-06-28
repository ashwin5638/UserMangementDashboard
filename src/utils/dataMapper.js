export const apiToApp = (apiUser) => {
  const nameParts = (apiUser.name || '').split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  return {
    id: apiUser.id,
    firstName,
    lastName,
    email: apiUser.email || '',
    department: apiUser.company?.name || '',
  };
};

export const appToApi = (appUser) => {
  const result = {
    name: `${appUser.firstName} ${appUser.lastName}`.trim(),
    email: appUser.email,
    company: { name: appUser.department || '' },
  };

  return result;
};
