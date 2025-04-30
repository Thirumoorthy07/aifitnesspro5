const Card = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={`aurora-card rounded-xl p-6 relative ${props.className}`}
    >
      {children}
    </div>
  );
}; 