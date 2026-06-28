import { useState, useEffect, useMemo, useCallback } from 'react';
import { getUser, createUser, updateUser, deleteUser } from '../api/userService';
import { filterUsers, searchUsers, sortUsers } from '../utils/helpers';
import { apiToApp, appToApi } from '../utils/dataMapper';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [sortField, setSortField] = useState('firstName');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUser();
      setUsers(data.map(apiToApp));
    } catch {
      setError('Unable to fetch active users from the database. Please verify your connection status and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const searched = useMemo(() =>
    searchUsers(users, searchTerm), [users, searchTerm]);

  const filtered = useMemo(() =>
    filterUsers(searched, filters), [searched, filters]);

  const sorted = useMemo(() =>
    sortUsers(filtered, sortField, sortDir), [filtered, sortField, sortDir]);

  const totalPages = useMemo(() =>
    Math.max(1, Math.ceil(sorted.length / pageSize)), [sorted.length, pageSize]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, filters, pageSize]);

  const handleSort = useCallback((field) => {
    setSortDir(prev => {
      if (sortField === field) {
        return prev === 'asc' ? 'desc' : 'asc';
      }
      return 'asc';
    });
    setSortField(field);
  }, [sortField]);

  const handleSetFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const addUser = useCallback(async (userData) => {
    const tempId = Date.now();
    const newUser = { ...userData, id: tempId };
    setUsers(prev => [...prev, newUser]);

    try {
      const apiData = appToApi(userData);
      const createdUser = await createUser(apiData);
      setUsers(prev => prev.map(u => u.id === tempId ? { ...u, id: createdUser.id } : u));
    } catch {
    }
    return { success: true };
  }, []);

  const editUser = useCallback(async (id, userData) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...userData } : u));
    try {
      const apiData = appToApi(userData);
      await updateUser(id, apiData);
    } catch {
     
    }
    return { success: true };
  }, []);

  const removeUser = useCallback(async (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    try {
      await deleteUser(id);
    } catch {
     
    }
    return { success: true };
  }, []);

  return {
    users: paginatedUsers,
    allUsersCount: sorted.length,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters: handleSetFilters,
    clearFilters: () => setFilters({}),
    sortField,
    sortDir,
    handleSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    totalPages,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
    refetch: fetchUsers,
  };
};
