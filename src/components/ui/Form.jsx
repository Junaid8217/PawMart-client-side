import { useState } from 'react';
import Input from './Input';
import Button from './Button';

const Form = ({ 
  children, 
  onSubmit, 
  className = '',
  loading = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      {children}
    </form>
  );
};

const FormField = ({ 
  name,
  label,
  type = 'text',
  required = false,
  validation,
  placeholder,
  helperText,
  className = '',
  ...props
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  const validateField = (val) => {
    if (required && !val.trim()) {
      return `${label} is required`;
    }
    
    if (validation) {
      return validation(val);
    }
    
    return '';
  };

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (touched) {
      const validationError = validateField(newValue);
      setError(validationError);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    const validationError = validateField(value);
    setError(validationError);
  };

  return (
    <Input
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={placeholder}
      helperText={helperText}
      error={touched ? error : ''}
      required={required}
      className={className}
      {...props}
    />
  );
};

const SubmitButton = ({ 
  children, 
  loading = false, 
  disabled = false,
  variant = 'primary',
  ...props 
}) => {
  return (
    <Button
      type="submit"
      variant={variant}
      loading={loading}
      disabled={disabled}
      className="w-full"
      {...props}
    >
      {children}
    </Button>
  );
};

Form.Field = FormField;
Form.Submit = SubmitButton;

export default Form;