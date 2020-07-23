import React, {useContext, useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom"
import {is_empty, pr} from "helpers/functions"
//import {GlobalContext} from 'components/context/global_context';
import {async_get_by_id, async_update} from "../async/async_requests"

import Navbar from "components/common/navbar"
import AlertSimple from 'helpers/bootstrap/alert/alertsimple';
import Breadscrumb from 'components/common/bootstrap/breadscrumb';
import SubmitAsync from 'helpers/bootstrap/button/submitasync';
import Footer from "components/common/footer"

function ProductUpdate(){

  const {id} = useParams()
  const [issubmitting, set_issubmitting] = useState(false)
  const [error, set_error] = useState("")
  const [success, set_success] = useState("")
  const refcode = useRef(null)
  const [inputfile,set_inputfile] = useState(null)

  const seldisplay = [
    {value:"0",text:"No"},
    {value:"1",text:"Yes"}
  ]

  const formdefault = {
    insert_user:"",
    insert_date:"",
    update_date:"",
    update_user:"",

    code_erp:"",
    description:"",
    slug:"",
    
    description_full:"",
    price_sale:"0",
    price_sale1:"0",
    order_by:"100",
    display:"0",
    url_image: "",
    id_user:1,
  }

  const [formdata, set_formdata] = useState({
    ...formdefault
  })

  const get_id = elem => {
    const idpref = elem.id || ""
    const parts = idpref.split("-")
    //console.log("parts",parts)
    if(parts.length>1) return parts[1]
    //console.log("elem.idpref",idpref)
    return idpref
  }

  const updateform = evt => {
    //set_email(e.target.value)
    //console.log("updateform.e.target",e.target)
    const elem = evt.target
    console.log("updateform.element:",elem)

    const id = get_id(elem)
    console.log("updateform.id",id)
    const temp = {...formdata}

    let value = elem.value
    if(id=="url_image" && !is_empty(elem.files)){
      set_inputfile(elem.files[0])
    }
    else {
      console.log("updateform.value",value)
      temp[id] = value
    }

    console.log("updateform.value temp:",temp)
    set_formdata(temp)
    console.log("updateform.formdata",formdata)
  }

  const before_submit = () => {

  }

  const on_submit = async (evt)=>{
    console.log("product.update.on_submit.formdata:",formdata)
    evt.preventDefault()

    set_issubmitting(true)
    set_error("")
    set_success("")
    //hacer insert y enviar fichero
    before_submit()
    
    try{
      console.log("on_submit.inputfile",inputfile)
      let url_image = formdata.url_image
      if(inputfile.name !="")
        url_image = inputfile

      const r = await async_update({...formdata,url_image})
      console.log("product.update.on_submit.r",r)
      if(r.error){
        set_error(r.error)
      }
      else{
        set_success("Num regs updated: ".concat(r))
        refcode.current.focus()
      }
    }
    catch(error){
      console.log("error:",error.toString())
      set_error(error.toString())
    }
    finally{
      set_issubmitting(false)
    }
  } // on_submit

  const async_onload = async () => {
    set_issubmitting(true)
    const r = await async_get_by_id(id)
    console.log("product.update.onload.r",r)
    const temp = {...formdata, ...r}
    //console.log("product.onload.formdata:")
    set_formdata(temp)
    console.log("product.update.onload.formdata:",formdata)
    set_issubmitting(false)
    refcode.current.focus()
  }

  useEffect(()=>{
    async_onload()
    return ()=> console.log("product.update unmounting")
  },[])

  return (
    <>
      <Navbar />
      <main className="container">
        
        <h1 className="mt-2 mb-2">Product update</h1>
        <Breadscrumb arbreads={[]}/>

        <form className="row g-3" onSubmit={on_submit}>
          {success!==""? <AlertSimple message={success} type="success" />: null}
          {error!==""? <AlertSimple message={error} type="danger" />: null}
          <div className="col-md-3">
            <label htmlFor="txt-code_erp" className="form-label">Code</label>
            <input type="text" className="form-control" id="txt-code_erp" placeholder="code in your system" 
            
              ref={refcode}
              value={formdata.code_erp}
              onChange={updateform}
              required 
            />
          </div>

          <div className="col-12">
            <label htmlFor="txt-description" className="form-label">Description</label>
            <input type="text" className="form-control" id="txt-description" placeholder="Name of product" 
            
            value={formdata.description}
            onChange={updateform}
            required 
            />
          </div>
          
          <div className="col-12">
            <label htmlFor="txt-description_full" className="form-label">Description large</label>
            <textarea className="form-control" id="txt-description_full" rows="2" placeholder="large description use # if needed upto 3000 chars"
              value={formdata.description_full}
              onChange={updateform}
              required 
            ></textarea>
          </div> 

          <div className="col-md-4">
            <label htmlFor="num-price_sale" className="form-label">Price</label>
            <input type="number" className="form-control" id="num-price_sale" placeholder="price in default currency" 
              value={formdata.price_sale}
              onChange={updateform}
              required    
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="num-price_sale1" className="form-label">Price 1</label>
            <input type="number" className="form-control" id="num-price_sale1" placeholder="price in second currency" 
              value={formdata.price_sale1}
              onChange={updateform}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="num-order_by" className="form-label">Order</label>
            <input type="number" className="form-control" id="num-order_by" 
              value={formdata.order_by}
              onChange={updateform}
              required            
            />
          </div>          

          <div className="col-md-6">
            <label htmlFor="sel-display" className="form-label">Display</label>
            <select id="sel-display" className="form-select"
              value={formdata.display}
              onChange={updateform}
              required
            >
              <option>Choose...</option>
              {
                seldisplay.map(obj => (<option key={obj.value} value={obj.value}>{obj.text}</option>))
              }
            </select>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="file-url_image" className="form-label">Picture: </label>
              <input type="file" className="form-control" id="file-url_image" 
                onChange={updateform}
              />
            </div>
          </div>

          {
            !is_empty(formdata.url_image)?
            (<div className="col-12">
              <a className="link-dark" href={formdata.url_image} target="_blank">{formdata.url_image}</a>
              <img src={formdata.url_image} className="img-fluid" />
            </div>)
            :null
          }          

          <div className="col-12">
            <SubmitAsync innertext="Save" type="primary" issubmitting={issubmitting} />
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default ProductUpdate;
