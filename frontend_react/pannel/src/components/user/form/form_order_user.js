import React, {useContext, useState} from 'react';
import {GlobalContext} from '../../context/global_context';
import Api from "../../../providers/api"
import Isvalid from "../../../helpers/isvalid"
import _ from "lodash"

function FormOrderUser() {

  const {user, set_user} = useContext(GlobalContext)

  const [email, set_email] = useState("")
  const [phone, set_phone] = useState("")
  const [fullname, set_fullname] = useState("")
  const [address, set_address] = useState("")
  const [notes, set_notes] = useState("")

  //const [tmpuser, set_tmpuser] = useState({})

  const hidemodal= () => {
    // const background = document.getElementsByClassName("modal-backdrop fade")[0];
    // if(background){
    //   const body = document.getElementsByTagName("body")[0]
    //   body.classList.remove("modal-open")
      
    //   background.parentNode.removeChild(background);
    //   background.style.display = "none";
      
    //   const modal = document.getElementById('order-user-modal')
    //   modal.style.display = "none"
    //   modal.setAttribute("aria-hidden", "true");
    // }
    const btn = document.getElementById("btn-close-modal")
    btn.click()
  }
  
  async function async_on_mail_change(e){

    const email = e.target.value.trim()
    if(!email) return;
    if(email.length < 6) return;
    if(!Isvalid.email(email)) return;

    const response = await Api.get_async_chekcemail(email)
    //if(response)
      //if(response.status === 200)
        //set_tmpuser(response.data.result)
  }

  const on_submit = (e)=>{
    e.preventDefault()
    //alert("send")
    hidemodal()
  }

  return (
    <form onSubmit={on_submit}>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="usr-email" className="pull-left">Email *</label>
            <input type="email" 
              id="usr-email" 
              className="form-control" 
              placeholder="your@email.com" 
              value={email}
              onChange={async_on_mail_change}
              required 
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="usr-phone" className="pull-left">Phone *</label>
            <input type="number" 
              id="usr-phone" 
              value={phone}
              className="form-control" 
              placeholder="+51 123 321 485" 
              required />
          </div>
        </div>        
      </div>

      <div className="row">
          <div className="col-md-12">
            <div className="form-group">
            <label htmlFor="usr-fullname" className="pull-left">Full name *</label>
              <input type="text" 
                id="usr-fullname" 
                value={fullname}
                className="form-control" 
                placeholder="...your first and last name"  
                required  />
            </div>
          </div>
      </div>

      <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label htmlFor="usr-address" className="pull-left">Address *</label>
              <input type="text" 
                id="usr-address"
                value={address} 
                className="form-control" placeholder="...your address" required  />
            </div>
          </div>
      </div>      

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="order-notes" className="pull-left">Observations</label>
            <textarea 
              id="order-notes" 
              value={notes}
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
          <button type="submit" className="btn btn-primary btn-fill btn-lg btn-block pull-right"><b>Accept</b></button>          
        </div>        
      </div>
    </form>
  )
}

export default FormOrderUser;
