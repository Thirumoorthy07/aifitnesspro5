const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`aurora-button px-6 py-2 rounded-lg text-white font-medium relative overflow-hidden ${props.className}`}
    >
      {children}
    </button>
  );
}; 