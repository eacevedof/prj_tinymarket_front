import React, {useContext, useState, useEffect} from 'react';

import {is_defined} from "../../../helpers/functions"

import Navbar from "../../../components/common/navbar"
import Breadscrumb from '../../../components/common/bootstrap/breadscrumb';
import Footer from "../../../components/common/footer"
import {GlobalContext} from '../../../components/context/global_context';

function ProductInsert() {

  const seldisplay = [
    {value:"0",text:"No"},
    {value:"1",text:"Yes"}
  ]

  const [frmdata, set_frmdata] = useState({
    code_erp:"",
    description:"",
    description_full:"",
    price_sale:"",
    price_sale1:"",
    order_by:"",
    display:"0",
    url_image:"",
  })

  const get_id = elem => {
    const idpref = elem.id || ""
    const parts = idpref.split("-")
    
    //console.log("parts",parts)
    if(parts.length>1) return parts[1]

    //console.log("elem.idpref",idpref)
    return idpref
  }

  const updateform = (e)=>{
    //set_email(e.target.value)
    //console.log("updateform.e.target",e.target)
    const elem = e.target
    //console.log("element:",elem)
    const id = get_id(elem)
    //console.log("updateform.id",id)
    const temp = {...frmdata}
    const value = elem.value

    //console.log("updateform.value",value)
    
    temp[id] = value
    set_frmdata(temp)
  }

  const on_submit = async (e)=>{
    e.preventDefault()
    console.log("on_submit.e:",e)
    
  }

  return (
    <>
      <Navbar />
      <main className="container">
        
        <h1 className="mt-2 mb-2">Product insert</h1>
        <Breadscrumb arbreads={[]}/>

        <form className="row g-3" onSubmit={on_submit}>
          <div className="col-md-3">
            <label htmlFor="txt-code_erp" className="form-label">Code</label>
            <input type="text" className="form-control" id="txt-code_erp" placeholder="code in your system" 
            
              value={frmdata.code_erp}
              onChange={updateform}
              required 
            />
          </div>

          <div className="col-12">
            <label htmlFor="txt-description" className="form-label">Description</label>
            <input type="text" className="form-control" id="txt-description" placeholder="Name of product" 
            
            value={frmdata.description}
            onChange={updateform}
            required 
            />
          </div>
          
          <div className="col-12">
            <label htmlFor="txt-description_full" className="form-label">Description large</label>
            <textarea className="form-control" id="txt-description_full" rows="2" placeholder="large description use # if needed upto 3000 chars"
              value={frmdata.description_full}
              onChange={updateform}
              required 
            ></textarea>
          </div> 

          <div className="col-md-4">
            <label htmlFor="num-price_sale" className="form-label">Price</label>
            <input type="number" className="form-control" id="num-price_sale" placeholder="price in default currency" 
              value={frmdata.price_sale}
              onChange={updateform}
              required    
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="num-price_sale1" className="form-label">Price 1</label>
            <input type="number" className="form-control" id="num-price_sale1" placeholder="price in second currency" 
              value={frmdata.price_sale1}
              onChange={updateform}
              required
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="num-order_by" className="form-label">Order</label>
            <input type="number" className="form-control" id="num-order_by" 
              value={frmdata.order_by}
              onChange={updateform}
              required            
            />
          </div>          

          <div className="col-md-6">
            <label htmlFor="sel-display" className="form-label">Display</label>
            <select id="sel-display" className="form-select"
              value={frmdata.display}
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
              <label htmlFor="file-image" className="form-label">Picture: </label>
              <input type="file" className="form-control" id="file-image" />
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

export default ProductInsert;
