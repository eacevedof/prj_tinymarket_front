import React from 'react';
import { get_uuid } from 'helpers/functions';

function Tdmultiaction({objrow, objconf}) {
  const uuid = get_uuid()
  return (
    <td>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" id={uuid} />
        <label className="form-check-label" htmlFor={uuid}></label>
      </div>
    </td>
  )
}

export default Tdmultiaction;
