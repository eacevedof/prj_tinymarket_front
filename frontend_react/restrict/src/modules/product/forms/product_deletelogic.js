import React, {useContext, useState, useEffect} from 'react';
import {useParams} from "react-router-dom"
import {is_empty} from "helpers/functions"
//import {GlobalContext} from 'components/context/global_context';
import {async_get_by_id, async_deletelogic} from "../async/async_requests"

import Navbar from "components/common/navbar"
import Breadscrumb from 'components/common/bootstrap/breadscrumb';
import RefreshAsync from 'helpers/bootstrap/button/refreshasync';
import Sysfields from "components/common/sysfields"
import Footer from "components/common/footer"

function ProductDeleteLogic(){

  const {id} = useParams()
  const [issubmitting, set_issubmitting] = useState(false)
  const [error, set_error] = useState("")
  const [success, set_success] = useState("")

  const seldisplay = [
    {value:"0",text:"No"},
    {value:"1",text:"Yes"}
  ]

  const [formdata, set_formdata] = useState({
    
    insert_user:"",
    insert_date:"",
    update_date:"",
    update_user:"",    

    id: -1,
    id_user: -1,

    code_erp:"",
    description:"",
    slug:"",
    description_full:"",
    price_sale:"0",
    price_sale1:"0",
    order_by:"100",
    display:"0",
    url_image: "",

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
    const elem = evt.target

    const id = get_id(elem)
    console.log("updateform.id",id)
    const temp = {...formdata}
    let value = elem.value
    if(id=="url_image" && !is_empty(elem.files)) value = elem.files[0]

    console.log("product.deletelogic.updateform.value",value)
    temp[id] = value
    console.log("product.deletelogic.temp:",temp)
    set_formdata(temp)

    console.log("product.deletelogic.formdata",formdata)
    //console.log("updateform.formdata",formdata,"formdata.url_image",formdata.url_image)
  }

  const before_submit = () => {}

  const async_refresh = async () => {
    await async_onload()
  }  

  const on_submit = async (evt)=>{
    console.log("product.deletelogic.on_submit.formdata:",formdata)
    evt.preventDefault()
    before_submit()    
    const r = await async_deletelogic(formdata)
    console.log("product.deletelogic.on_submit.r",r)
  }

  const async_onload = async () => {
    const r = await async_get_by_id(id)
    console.log("product.deletelogic.onload.r",r)
    const temp = {...formdata, ...r}
    //console.log("product.onload.formdata:")
    set_formdata(temp)
    console.log("product.deletelogic.onload.formdata:",formdata)
  }

  useEffect(()=>{
    async_onload()
    return ()=> console.log("product.deletelogic unmounting")
  },[])

  return (
    <>
      <Navbar />
      <main className="container">
        
        <h1 className="mt-2 mb-2">Product delete log.</h1>
        <Breadscrumb arbreads={[]}/>

        <form className="row g-3" onSubmit={on_submit}>
          <div className="col-md-3">
            <label htmlFor="txt-code_erp" className="form-label">Code</label>
            <input type="text" className="form-control border-0" id="txt-code_erp" placeholder="code in your system" 
              value={formdata.code_erp}
              disabled 
            />
          </div>
          <div className="col-md-3">
            <RefreshAsync issubmitting={issubmitting} fnrefresh={async_refresh} />
          </div>
          <div className="col-12">
            <label htmlFor="txt-description" className="form-label">Description</label>
            <input type="text" className="form-control" id="txt-description" placeholder="Name of product" 
            
            value={formdata.description}
            disabled 
            />
          </div>
          
          <div className="col-12">
            <label htmlFor="txt-description_full" className="form-label">Description large</label>
            <textarea className="form-control border-0" id="txt-description_full" rows="2" placeholder="large description use # if needed upto 3000 chars"
              value={formdata.description_full}
              disabled 
            ></textarea>
          </div> 

          <div className="col-md-4">
            <label htmlFor="num-price_sale" className="form-label">Price</label>
            <input type="number" className="form-control border-0" id="num-price_sale" placeholder="price in default currency" 
              value={formdata.price_sale}
              disabled    
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="num-price_sale1" className="form-label">Price 1</label>
            <input type="number" className="form-control border-0" id="num-price_sale1" placeholder="price in second currency" 
              value={formdata.price_sale1}
              disabled
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="num-order_by" className="form-label">Order</label>
            <input type="number" className="form-control border-0" id="num-order_by" 
              value={formdata.order_by}
              disabled            
            />
          </div>          

          <div className="col-md-6">
            <label htmlFor="sel-display" className="form-label">Display</label>
            <select id="sel-display" className="form-select border-0"
              value={formdata.display}
              disabled
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
              <img src={formdata.url_image} className="img-fluid" />
            </div>
          </div>

          <Sysfields sysdata={formdata} />
          
          <div className="col-12">
            <button type="submit" className="btn btn-danger border-0">Delete Log</button>
          </div>
          
        </form>
      </main>
      <Footer />
    </>
  )
}

export default ProductDeleteLogic;
