import React from 'react';

function NotificationSuccess({title,message}) {

  return (
    <div className="alert alert-success">
      <button type="button" aria-hidden="true" className="close" data-dismiss="alert">
        <i className="nc-icon nc-simple-remove"></i>
      </button>
      <span>
        <b>{title}</b> {message}
      </span>
    </div>
  )
}

export default NotificationSuccess;
