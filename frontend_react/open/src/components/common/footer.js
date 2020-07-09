import React from 'react';

function footer() {
  const version = process.env.REACT_APP_VERSION
  return (
    <footer className="footer">
      <div className="container-fluid">
        <nav>
          <p className="copyright text-center">
            © {new Date().getFullYear()} 
            <a href="http://www.elchalanaruba.com" target="_blank" rel="noopener noreferrer"> El Chalán Aruba</a>
            <small>&nbsp;&nbsp; {version}</small>
          </p>
        </nav>
      </div>
    </footer>    
  )
}

export default footer;


