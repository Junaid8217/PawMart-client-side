const Skeleton = ({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  variant = 'rectangular'
}) => {
  const variantClasses = {
    rectangular: 'design-skeleton',
    circular: 'design-skeleton rounded-full',
    text: 'design-skeleton h-4'
  };
  
  const style = {
    width,
    height: variant === 'text' ? '1rem' : height
  };
  
  return (
    <div 
      className={`${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
};

const SkeletonCard = () => (
  <div className="design-card p-6">
    <div className="space-y-4">
      <Skeleton height="200px" />
      <Skeleton height="1.5rem" width="60%" />
      <Skeleton height="1rem" width="80%" />
      <Skeleton height="1rem" width="40%" />
      <div className="flex gap-2 mt-4">
        <Skeleton height="2.5rem" width="100px" />
        <Skeleton height="2.5rem" width="80px" />
      </div>
    </div>
  </div>
);

Skeleton.Card = SkeletonCard;

export default Skeleton;