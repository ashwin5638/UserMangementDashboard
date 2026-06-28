export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr className="user-row">
      <td className="td-index">{user.id}</td>
      <td className="td-first-name" data-label="First Name">
        <div className="user-name-cell">
          <div className="user-avatar">{user.firstName.charAt(0).toUpperCase()}</div>
          <div className="user-name">{user.firstName}</div>
        </div>
      </td>
      <td className="td-last-name" data-label="Last Name">{user.lastName}</td>
      <td className="td-email" data-label="Email">{user.email}</td>
      <td className="td-department" data-label="Department">{user.department || '-'}</td>
      <td className="td-actions" data-label="Actions">
        <div className="action-buttons">
          <button className="btn btn-sm btn-edit" onClick={() => onEdit(user)} title="Edit user">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
          <button className="btn btn-sm btn-delete" onClick={() => onDelete(user)} title="Delete user">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
