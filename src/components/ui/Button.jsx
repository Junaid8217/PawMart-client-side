import { forwardRef } from 'react';

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false, 
  className = '', 
  ...props 
}, ref) => {
  const baseClasses = 'design-button';
  
  const variantClasses = {
    primary: 'design-button-primary',
    secondary: 'design-button-secondary',
    accent: 'design-button-accent',
    outline: 'design-button-outline'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-8',
    md: 'px-4 py-2 text-sm min-h-10',
    lg: 'px-6 py-3 text-base min-h-12'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="design-loader mr-2" />}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;