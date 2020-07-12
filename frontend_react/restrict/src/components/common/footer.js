import React from 'react';

function footer() {
  const version = process.env.REACT_APP_VERSION
  return (
    <footer className="footer mt-3">
      <div className="container-fluid">
        <nav>
          <p className="text-center">
            © {new Date().getFullYear()} 
            &nbsp;&nbsp;Admin pannel
            &nbsp;&nbsp; {version}
          </p>
        </nav>
      </div>
    </footer>    
  )
}

export default footer;


