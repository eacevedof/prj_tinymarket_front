import React, {useContext} from 'react';
import {GlobalContext} from '../../context/global_context';

function FormOrderUser() {

  const {user, set_user} = useContext(GlobalContext)

  const on_submit = (e)=>{
    e.preventDefault()
    alert("send")
  }

  return (
    <form onSubmit={on_submit}>
      <div className="row">
          <div className="col-md-12">
            <div className="form-group">
            <label htmlFor="usr-fullname" className="pull-left">Full name</label>
              <input type="text" id="usr-fullname" className="form-control" placeholder="...your first and last name"  required  />
            </div>
          </div>
      </div>

      <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="usr-address" className="pull-left">Address</label>
              <input type="text" id="usr-address" className="form-control" placeholder="...your address" required  />
            </div>
          </div>
      </div>      
      
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="usr-email" className="pull-left">Email</label>
            <input type="email" id="usr-email" className="form-control" placeholder="your@email.com" required />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="usr-phone" className="pull-left">Phone</label>
            <input type="number" id="usr-phone" className="form-control" placeholder="+51 123 321 485" required />
          </div>
        </div>        
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="order-notes" className="pull-left">Observations</label>
            <textarea 
              id="order-notes" 
              rows="5000" 
              cols="800" 
              className="form-control text-area-h"
              placeholder="...let us know more: Need cutlery?, extra rice?, Is anyone else coming to pick it up?, etc" ></textarea>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 btn-modal-fix">
          <button type="button" className="btn btn-secondary btn-fill btn-lg btn-block" data-dismiss="modal"><b>Cancel</b></button>  
        </div>
        <div className="col-lg-6 btn-modal-fix">
          <button type="button" className="btn btn-primary btn-fill btn-lg btn-block pull-right"><b>Accept</b></button>          
        </div>        
      </div>
    </form>
  )
}

export default FormOrderUser;
