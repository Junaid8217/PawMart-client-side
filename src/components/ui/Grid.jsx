const Grid = ({ 
  children, 
  cols = 1, 
  gap = 'lg',
  className = '' 
}) => {
  const colClasses = {
    1: 'design-grid-cols-1',
    2: 'design-grid-cols-2',
    3: 'design-grid-cols-3'
  };
  
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12'
  };
  
  return (
    <div className={`design-grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default Grid;