export default function ConfirmDelete({ isOpen, onClose, onConfirm, user }) {
  if (!isOpen || !user) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Confirm Deletion</h2>
        </div>
        <div className="modal-body">
          <div className="confirm-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <p className="confirm-text">
            Are you sure you want to delete <strong>{user.name}</strong>?
          </p>
          <p className="confirm-subtext">
            This action cannot be undone. The user will be permanently removed from the system.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" onClick={() => onConfirm(user)}>Delete User</button>
        </div>
      </div>
    </div>
  );
}
