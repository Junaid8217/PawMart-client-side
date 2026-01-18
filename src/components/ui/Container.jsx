const Container = ({ 
  children, 
  className = '',
  size = 'default'
}) => {
  const sizeClasses = {
    sm: 'max-w-4xl',
    default: 'max-w-6xl',
    lg: 'max-w-7xl',
    full: 'max-w-full'
  };
  
  return (
    <div className={`design-container ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  );
};

export default Container;