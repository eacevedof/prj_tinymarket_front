import React from 'react';

function footer() {
  const version = process.env.REACT_APP_VERSION
  return (
    <footer className="footer mt-3">
      <div className="container-fluid">
        <nav>
          <p className="lead text-center">
            © {new Date().getFullYear()} 
            &nbsp;&nbsp;Admin pannel
            <small>&nbsp;&nbsp; {version}</small>
          </p>
        </nav>
      </div>
    </footer>    
  )
}

export default footer;


