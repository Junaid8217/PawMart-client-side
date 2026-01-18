import { forwardRef, useState } from 'react';

const Input = forwardRef(({ 
  label,
  error,
  success,
  helperText,
  required = false,
  className = '',
  type = 'text',
  ...props 
}, ref) => {
  const [focused, setFocused] = useState(false);
  
  const inputClasses = `design-input ${error ? 'error' : ''} ${success ? 'success' : ''} ${className}`;
  
  return (
    <div className="design-form-group">
      {label && (
        <label className="design-label">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        className={inputClasses}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      
      {error && <div className="design-error-message">{error}</div>}
      {success && <div className="design-success-message">{success}</div>}
      {helperText && !error && !success && (
        <div className="text-gray-500 text-xs mt-1">{helperText}</div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;