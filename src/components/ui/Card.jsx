import { forwardRef } from 'react';

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = true,
  ...props 
}, ref) => {
  const classes = `design-card ${hover ? 'hover:shadow-lg hover:-translate-y-1' : ''} ${className}`;
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-4 ${className}`}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 ${className}`}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;