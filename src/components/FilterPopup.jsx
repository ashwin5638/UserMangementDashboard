import { useState, useEffect } from 'react';

export default function FilterPopup({ isOpen, onClose, onApply, onReset, filters }) {
  const [localFilters, setLocalFilters] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        firstName: filters.firstName || '',
        lastName: filters.lastName || '',
        email: filters.email || '',
        department: filters.department || '',
      });
    }
  }, [isOpen, filters]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    const active = {};
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value.trim()) active[key] = value.trim();
    });
    onApply(active);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({ firstName: '', lastName: '', email: '', department: '' });
    onReset();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content filter-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Filter Users</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by first name..."
              value={localFilters.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by last name..."
              value={localFilters.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by email..."
              value={localFilters.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by department..."
              value={localFilters.department}
              onChange={(e) => handleChange('department', e.target.value)}
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleReset}>Reset</button>
          <button className="btn btn-primary" onClick={handleApply}>Apply Filters</button>
        </div>
      </div>
    </div>
  );
}
