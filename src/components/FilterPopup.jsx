import { useState, useEffect } from 'react';

export default function FilterPopup({ isOpen, onClose, onApply, onReset, filters }) {
  const [localFilters, setLocalFilters] = useState({
    name: '',
    email: '',
    company: '',
    city: '',
  });

  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        name: filters.name || '',
        email: filters.email || '',
        company: filters.company || '',
        city: filters.city || '',
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
    setLocalFilters({ name: '', email: '', company: '', city: '' });
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
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by name..."
              value={localFilters.name}
              onChange={(e) => handleChange('name', e.target.value)}
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
            <label className="form-label">Company</label>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by company..."
              value={localFilters.company}
              onChange={(e) => handleChange('company', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-input"
              placeholder="Filter by city..."
              value={localFilters.city}
              onChange={(e) => handleChange('city', e.target.value)}
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
