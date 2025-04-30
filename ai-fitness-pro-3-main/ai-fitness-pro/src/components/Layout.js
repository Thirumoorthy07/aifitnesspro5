import '../styles/auroraTheme.css';

const Layout = ({ children }) => {
  return (
    <div className="aurora-bg min-h-screen">
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout; 