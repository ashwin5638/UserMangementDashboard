import UserRow from './UserRow';

const SORTABLE_COLUMNS = [
  { key: 'firstName', label: 'First Name', sortable: true },
  { key: 'lastName', label: 'Last Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
];

export default function UserTable({ users, sortField, sortDir, onSort, onEdit, onDelete, loading, error }) {
  const getSortIcon = (field) => {
    if (sortField !== field) return 'sort-neutral';
    return sortDir === 'asc' ? 'sort-asc' : 'sort-desc';
  };

  if (loading) {
    return (
      <div className="table-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-container">
        <div className="error-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="table-container">
        <div className="empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <p>No users found matching your criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
              <th className="th-index">ID</th>
              {SORTABLE_COLUMNS.map(col => (
                <th
                  key={col.key}
                  className={col.sortable ? 'th-sortable' : ''}
                  onClick={() => col.sortable && onSort(col.key)}
                >
                  <div className="th-content">
                    {col.label}
                    {col.sortable && (
                      <span className={`sort-icon ${getSortIcon(col.key)}`}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 5L7 9M7 9L3 5M7 9V1M7 9V17" transform="rotate(90, 7, 9)" />
                        </svg>
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="th-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
