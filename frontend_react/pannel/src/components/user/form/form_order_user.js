import React, {useContext, useState, useEffect} from 'react';
import {GlobalContext} from '../../context/global_context';
import Api from "../../../providers/api"
import Isvalid from "../../../helpers/isvalid"
import _ from "lodash"
import LocalDb from "../../../helpers/local_db"
import objorder from "../../../models/order"
import objuser from "../../../models/user"
import Localdb from '../../../helpers/local_db';
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'

function FormOrderUser() {

  const Swal2 = withReactContent(Swal)

  const {user, set_user, order, set_order} = useContext(GlobalContext)

  const [email, set_email] = useState("")
  const [phone, set_phone] = useState("")
  const [fullname, set_fullname] = useState("")
  const [address, set_address] = useState("")
  const [notes, set_notes] = useState("")

  //const [tmpuser, set_tmpuser] = useState({})

  const hidemodal= () => {  document.getElementById("btn-close-modal").click() }
  
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

  const on_change_email = (e) => {set_email(e.target.value)}
  const on_change_phone = (e) => {set_phone(e.target.value)}
  const on_change_fullname = (e) => {set_fullname(e.target.value)}
  const on_change_address = (e) => {set_address(e.target.value)}
  const on_change_notes = (e) => {set_notes(e.target.value)}

  const get_total = products => {
    const sum = products
                  .map(product => parseFloat(product.price_sale) * parseFloat(product.units ? product.units:0))
                  .reduce((ac,price)=> ac = ac + price,0)
  
    return _.round(sum,2).toFixed(2)
  }

  const on_submit = async (e)=>{
    e.preventDefault()

    const formdata = new FormData()   
    formdata.append("user[email]",email)
    formdata.append("user[phone]",phone)
    formdata.append("user[fullname]",fullname)
    formdata.append("user[address]",address)
    formdata.append("order[notes]",notes)

    order.products.forEach(objprod => {
      const prodid = objprod.id
      formdata.append(`order[products][${prodid}][id]`,objprod.id)
      formdata.append(`order[products][${prodid}][description]`,objprod.description)
      formdata.append(`order[products][${prodid}][units]`,objprod.units)
      formdata.append(`order[products][${prodid}][price_sale]`,objprod.price_sale)
      formdata.append(`order[products][${prodid}][code_cache]`,objprod.code_cache)
    })

    formdata.append(`order[total]`,get_total(order.products))
    //recuperar pedido y usuario
    //enviar pedido y usuario
    const response = await Api.send_async_order(formdata)
    if(response.error){

      return
    }
    
    //guardo un pedido vacio
    set_order(objorder)
    const theuser = {
      ...objuser,
      email,
      phone,
      fullname,
      address,
    }
    
    Localdb.save("user",theuser)
    set_user(theuser)
    //limpiar pedido
    //guardar usuario en bd
    hidemodal()
    swal_ok()
  }

  const swal_ok = (strval) => {
    
          Swal2.fire({
        title: <p>Your purchase is in progress. You will receive a copy in your email

              </p>,
        showConfirmButton: true,
      })
    
  }


  useEffect(() => {

    if(!_.isEmpty(user)){
      set_email(user.email)
      set_phone(user.phone)
      set_fullname(user.fullname)
      set_address(user.address)
    }

    return ()=> console.log("unmounting FormOrderUser")
  }, []);

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
              onChange={on_change_email}
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
              onChange={on_change_phone}
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
                onChange={on_change_fullname}
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
                onChange={on_change_address}
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
              onChange={on_change_notes}
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
