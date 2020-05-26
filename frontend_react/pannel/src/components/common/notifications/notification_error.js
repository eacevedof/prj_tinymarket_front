import React, {useContext} from 'react';

function NotificationError({title,message}) {

  return (
    <div className="alert alert-danger">
      <button type="button" aria-hidden="true" className="close" data-dismiss="alert">
        <i className="nc-icon nc-simple-remove"></i>
      </button>
      <span>
        <b>{title}</b> {messag}
      </span>
    </div>
  )
}

export default NotificationError;
