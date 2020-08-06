import React from 'react';
import {APP_VERSION, APP_ENV} from "config/constants"

function footer() {
  
  return (
    <footer className="footer mt-3">
      <div className="container-fluid">
        <nav>
          <p className="text-center">
            © {new Date().getFullYear()} 
            &nbsp;&nbsp;Admin pannel
            <sub>&nbsp;&nbsp; {APP_VERSION}</sub>
            <sub>&nbsp;&nbsp; {APP_ENV}</sub>
          </p>
        </nav>
      </div>
    </footer>    
  )
}

export default footer;


