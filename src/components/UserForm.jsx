import { useState, useEffect } from 'react';
import { validateUserForm } from '../utils/validators';

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  department: '',
};

function FormField({ label, name, type = 'text', value, onChange, onBlur, error, placeholder, required = false }) {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required"> *</span>}
      </label>
      <input
        type={type}
        className={`form-input ${error ? 'input-error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur?.(name)}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

export default function UserForm({ isOpen, onClose, onSubmit, initialData, isEditing }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        setForm({
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          email: initialData.email || '',
          department: initialData.department || '',
        });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
    }
  }, [isOpen, isEditing, initialData]);

  const validateField = (field) => {
    const fullErrors = validateUserForm(form);
    setErrors(prev => ({ ...prev, [field]: fullErrors[field] || null }));
  };

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    const result = await onSubmit(form);
    setSubmitting(false);

    if (result?.success) {
      onClose();
    } else {
      setErrors({ submit: result?.error || 'An unexpected error occurred.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit User' : 'Add New User'}</h2>
          <button className="modal-close" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <FormField label="First Name" name="firstName" value={form.firstName} onChange={handleChange} onBlur={validateField} error={errors.firstName} placeholder="John" required />
              <FormField label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} onBlur={validateField} error={errors.lastName} placeholder="Doe" required />
            </div>
            <div className="form-row">
              <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={validateField} error={errors.email} placeholder="john@example.com" required />
              <FormField label="Department" name="department" value={form.department} onChange={handleChange} onBlur={validateField} error={errors.department} placeholder="Engineering" required />
            </div>
            {errors.submit && <div className="error-banner">{errors.submit}</div>}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : (isEditing ? 'Update User' : 'Add User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
