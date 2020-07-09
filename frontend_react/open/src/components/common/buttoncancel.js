import React from 'react';

function Buttoncancel({text, in_progress}) {
  return (
    <>
    {
      in_progress ? 
        <button type="button" className="btn btn-secondary btn-fill btn-lg btn-block" data-dismiss="modal" disabled><b>{text}</b></button>
      :
      <button type="button" className="btn btn-secondary btn-fill btn-lg btn-block" data-dismiss="modal"><b>{text}</b></button>
    }
    </>   
  )
}

export default Buttoncancel;
