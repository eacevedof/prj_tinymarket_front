import React, {useContext, useState, useEffect} from 'react';
import {useParams} from "react-router-dom"
import {is_empty} from "../../../helpers/functions"
import apidb from "../../../providers/apidb"

//import {GlobalContext} from '../../../components/context/global_context';
import {get_obj_update} from "../queries/queries_update"
import {async_get_by_id} from "../fetchers/fetch_update"

import Navbar from "../../../components/common/navbar"
import Breadscrumb from '../../../components/common/bootstrap/breadscrumb';
import Footer from "../../../components/common/footer"

function ProductUpdate(){

  const {id} = useParams()

  const seldisplay = [
    {value:"0",text:"No"},
    {value:"1",text:"Yes"}
  ]

  const [formdata, set_formdata] = useState({
    code_erp:"",
    description:"",
    slug:"",
    insert_user:"react",
    description_full:"",
    price_sale:"0",
    price_sale1:"0",
    order_by:"100",
    display:"0",
    url_image: null,
    id_user:1,
  })

  const get_id = elem => {
    const idpref = elem.id || ""
    const parts = idpref.split("-")
    //console.log("parts",parts)
    if(parts.length>1) return parts[1]
    //console.log("elem.idpref",idpref)
    return idpref
  }

  const updateform = evt =>{
    //set_email(e.target.value)
    //console.log("updateform.e.target",e.target)
    const elem = evt.target
    //console.log("updateform.element:",elem,"files[0]:",elem.files[0])
    const id = get_id(elem)
    console.log("updateform.id",id)
    const temp = {...formdata}
    let value = elem.value
    if(id=="url_image" && !is_empty(elem.files)) value = elem.files[0]

    console.log("updateform.value",value)
    temp[id] = value
    console.log("updateform.value temp:",temp)
    set_formdata(temp)

    console.log("updateform.formdata",formdata)
    //console.log("updateform.formdata",formdata,"formdata.url_image",formdata.url_image)
  }

  const before_submit = () => {

  }

  const on_submit = async (evt)=>{
    console.log("on_submit.formdata:",formdata)
    evt.preventDefault()
    //hacer insert y enviar fichero
    before_submit()
    const objparam = {fields:{...formdata}}
    const objinsert = get_obj_update(objparam)
    const r = await apidb.async_insert(objinsert)
    
    console.log("on_submit.r",r)
  }

  const async_onload = async () => {
    
    
  }

  useEffect(()=>{
    async_onload()

    return ()=> console.log("product.insert unmounting")
  },[])

  return (
    <>
      <Navbar />
      <main className="container">
        
        <h1 className="mt-2 mb-2">Product update</h1>
        <Breadscrumb arbreads={[]}/>

        <form className="row g-3" onSubmit={on_submit}>
          <div className="col-md-3">
            <label htmlFor="txt-code_erp" className="form-label">Code</label>
            <input type="text" className="form-control" id="txt-code_erp" placeholder="code in your system" 
            
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
              <option defaultValue>Choose...</option>
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

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default ProductUpdate;
