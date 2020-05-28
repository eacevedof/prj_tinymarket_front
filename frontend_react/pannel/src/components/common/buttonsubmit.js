import React from 'react';

function Buttonsubmit({text, in_progress}) {
  return (
    <>
    {
      in_progress ? 
        <button type="submit" className="btn btn-primary btn-fill btn-lg btn-block pull-right buttonload" disabled>
          <i className="fa fa-circle-o-notch fa-spin"></i> in progress
        </button>
      :
        <button type="submit" className="btn btn-primary btn-fill btn-lg btn-block pull-right">
          <b>{text}</b>
        </button>
    }
    </>   
  )
}

export default Buttonsubmit;
