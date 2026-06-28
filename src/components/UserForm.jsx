import { useState, useEffect } from 'react';
import { validateUserForm } from '../utils/validators';

const emptyForm = {
  name: '',
  username: '',
  email: '',
  phone: '',
  website: '',
  company: { name: '', catchPhrase: '', bs: '' },
  address: { street: '', suite: '', city: '', zipcode: '' },
};

function FormField({ label, name, type = 'text', value, onChange, onBlur, error, placeholder, required = false, parent }) {
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
        onChange={(e) => onChange(name, e.target.value, parent)}
        onBlur={() => onBlur?.(name, parent)}
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
          name: initialData.name || '',
          username: initialData.username || '',
          email: initialData.email || '',
          phone: initialData.phone || '',
          website: initialData.website || '',
          company: {
            name: initialData.company?.name || '',
            catchPhrase: initialData.company?.catchPhrase || '',
            bs: initialData.company?.bs || '',
          },
          address: {
            street: initialData.address?.street || '',
            suite: initialData.address?.suite || '',
            city: initialData.address?.city || '',
            zipcode: initialData.address?.zipcode || '',
          },
        });
      } else {
        setForm(emptyForm);
      }
      setErrors({});
    }
  }, [isOpen, isEditing, initialData]);

  const validateField = (field, parent) => {
    const fullErrors = validateUserForm(form);
    const mappedField = parent ? parent + field.charAt(0).toUpperCase() + field.slice(1) : field;
    setErrors(prev => ({ ...prev, [mappedField]: fullErrors[mappedField] || null }));
  };

  const handleChange = (field, value, parent) => {
    if (parent) {
      setForm(prev => ({ ...prev, [parent]: { ...prev[parent], [field]: value } }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
    const mappedField = parent ? parent + field.charAt(0).toUpperCase() + field.slice(1) : field;
    setErrors(prev => {
      const next = { ...prev };
      delete next[mappedField];
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
            <h3 className="form-section-title">Personal Information</h3>
            <div className="form-row">
              <FormField label="Name" name="name" value={form.name} onChange={handleChange} onBlur={validateField} error={errors.name} placeholder="John Doe" required />
              <FormField label="Username" name="username" value={form.username} onChange={handleChange} onBlur={validateField} error={errors.username} placeholder="johndoe" required />
            </div>
            <div className="form-row">
              <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={validateField} error={errors.email} placeholder="john@example.com" required />
              <FormField label="Phone" name="phone" value={form.phone} onChange={handleChange} onBlur={validateField} error={errors.phone} placeholder="1-234-567-8900" required />
            </div>
            <FormField label="Website" name="website" value={form.website} onChange={handleChange} onBlur={validateField} placeholder="johndoe.com" />

            <h3 className="form-section-title">Address</h3>
            <div className="form-row">
              <FormField label="Street" name="street" value={form.address.street} onChange={handleChange} onBlur={validateField} placeholder="123 Main St" parent="address" />
              <FormField label="Suite" name="suite" value={form.address.suite} onChange={handleChange} onBlur={validateField} placeholder="Apt. 123" parent="address" />
            </div>
            <div className="form-row">
              <FormField label="City" name="city" value={form.address.city} onChange={handleChange} onBlur={validateField} error={errors.city} placeholder="New York" required parent="address" />
              <FormField label="Zipcode" name="zipcode" value={form.address.zipcode} onChange={handleChange} onBlur={validateField} placeholder="12345" parent="address" />
            </div>

            <h3 className="form-section-title">Company</h3>
            <FormField label="Company Name" name="name" value={form.company.name} onChange={handleChange} onBlur={validateField} error={errors.companyName} placeholder="Acme Corp" required parent="company" />
            <div className="form-row">
              <FormField label="Catch Phrase" name="catchPhrase" value={form.company.catchPhrase} onChange={handleChange} onBlur={validateField} placeholder="Innovative solutions" parent="company" />
              <FormField label="BS" name="bs" value={form.company.bs} onChange={handleChange} onBlur={validateField} placeholder="Business strategy" parent="company" />
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
