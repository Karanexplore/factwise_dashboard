import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <div className="app-header-title">FactWise Employee Dashboard</div>
          <div className="app-header-subtitle">
            
          </div>
        </div>
        <div className="d-none d-sm-block">
          {/* <span className="badge text-bg-light">
            Frontend Assessment · React + AG Grid
          </span> */}
        </div>
      </header>
      <main className="app-main">
        {children}
      </main>
    </div>
  );
};

export default Layout;
