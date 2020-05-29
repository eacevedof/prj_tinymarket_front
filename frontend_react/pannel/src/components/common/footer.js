import React from 'react';

function footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <nav>
          <p className="copyright text-center">
            © {new Date().getFullYear()} 
            <a href="http://www.elchalanaruba.com" target="_blank" rel="noopener noreferrer"> El Chalán Aruba</a>
          </p>
          <p>
            Version 1.0.0
          </p>
        </nav>
      </div>
    </footer>    
  )
}

export default footer;


