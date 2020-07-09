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
import Buttonsubmit from "../../common/buttonsubmit"
import Buttoncancel from "../../common/buttoncancel"


console.log("form_order_user.objorder.reset()",objorder.reset())

function FormOrderUser() {
  console.log("form_order_user.start.objorder",objorder)
  const Swal2 = withReactContent(Swal)

  const {user, set_user, order, set_order} = useContext(GlobalContext)

  const [email, set_email] = useState("")
  const [phone, set_phone] = useState("")
  const [fullname, set_fullname] = useState("")
  const [address, set_address] = useState("")
  const [notes, set_notes] = useState("")
  const [is_error,set_is_error] = useState(false)
  const [in_progress, set_in_progress] = useState(false)

  //const [result, set_result] = useState({title:"",message:""})

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
    set_in_progress(true)
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

    //response.error generado por el js
    //response.data.error generado por el servidor
    if(response.error || response.data.error){
      console.log("onsubmit launching error setting is_error true")
      set_is_error(true)
      set_in_progress(false)
      swal_error()
      return 
    }
    
    //guardo un pedido vacio
    console.log("on_submit deleting dborder")
    LocalDb.delete("order")
    console.log("on_submit setting empty order: ",objorder)
    set_order(objorder)
    
    const theuser = {
      ...objuser,
      //id:response.result.id,
      email,
      phone,
      fullname,
      address,
    }
    
    console.log("on_submit saving dbuser", theuser)
    Localdb.save("user",theuser)
    console.log("on_submit setting user", theuser)
    set_user(theuser)
    set_in_progress(false)
    //limpiar pedido
    //guardar usuario en bd
    //console.log("RESPONSE:",response)
    hidemodal()
    swal_ok(response.data.result)
  } // _on_submit

  const swal_ok = (objorder) => {
    Swal2.fire({
      icon: 'success',
      html: `<p>
            Thank you for your purchase. <br/>
            You will receive a copy in your email soon<br/>
            Your order code is: <br/> <b>${objorder.id} - ${objorder.code_cache}</b>
            </p>
            <a href="/"><b>New order</b></a>
            `,

    })
  }

  const swal_error = () => {
    Swal2.fire({
      icon: 'error',
      title: 'Oops...',
      html: `<p>
            Please try later. If this problem persists send us an email with your request to
            </p>
            <a href="mailto:elchalanaruba@gmail.com?Subject=Manual order cause error">
              <b>elchalanaruba@gmail.com</b>
            </a>
            `
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
          <Buttoncancel text="Cancel" in_progress={in_progress} />
        </div>
        <div className="col-lg-6 btn-modal-fix">
          <Buttonsubmit text="Aceptar" in_progress={in_progress} />
        </div>        
      </div>
    </form>
  )
}

export default FormOrderUser;
