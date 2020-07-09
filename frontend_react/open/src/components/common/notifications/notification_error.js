import React from 'react';

function NotificationError({title,message}) {

  return (
    <div className="row">
      <div className="col-12">
        <img src="/assets/img/error-icon.png" alt="error-icon" className="img-responsive pull-left" height="50" width="50" />
        <p>
          &nbsp;&nbsp;<b>{title}</b><br/>
          &nbsp;&nbsp;{message}
        </p>
      </div>
    </div>
  )
}

export default NotificationError;
