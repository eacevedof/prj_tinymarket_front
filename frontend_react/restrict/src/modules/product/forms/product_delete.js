import React, {useState, useEffect, useRef} from 'react';
import {useParams} from "react-router-dom"
import {MODCONFIG} from "modules/product/config/config"
import { pr, is_empty } from 'helpers/functions';
import {async_get_by_id, async_delete} from "../async/async_requests"

import Navbar from "components/common/navbar"
import AlertSimple from 'helpers/bootstrap/alert/alertsimple';
import ToastSimple from 'helpers/bootstrap/toast/toastsimple';
import Breadscrumb from 'components/common/bootstrap/breadscrumb';
import RefreshAsync from 'helpers/bootstrap/button/refreshasync';
import SubmitAsync from 'helpers/bootstrap/button/submitasync';
import Sysfields from "components/common/sysfields"
import Footer from "components/common/footer"


function ProductDelete(){

  const {id} = useParams()
  const [issubmitting, set_issubmitting] = useState(false)
  const [error, set_error] = useState("")
  const [success, set_success] = useState("")
  const refcode = useRef(null)
  const [isdeleted, set_isdeleted] = useState(false)

  const seldisplay = [
    {value:"0",text:"No"},
    {value:"1",text:"Yes"}
  ]

  const [formdata, set_formdata] = useState({
    insert_user:"",
    insert_date:"",
    update_date:"",
    update_user:"",    
    delete_user:"",
    delete_date:"",

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

  const before_submit = () => {}

  const async_refresh = async () => {
    await async_onload()
  }

  const on_submit = async (evt)=>{
    console.log("product.delete.on_submit.formdata:",formdata)
    evt.preventDefault()

    set_issubmitting(true)
    set_error("")
    set_success("")
    //hacer insert y enviar fichero
    before_submit()
    
    try{
      const r = await async_delete(formdata)
      console.log("product.delete.on_submit.r",r)
      if(r.error){
        set_error(r.error)
      }
      else{
        set_success("Num regs deleted: ".concat(r))
        //async_onload()
        set_isdeleted(true)
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
    console.log("product.delete.onload.r",r)
    const temp = {...formdata, ...r}
    console.log("product.delete.onload.temp",temp)
    set_formdata(temp)
    if(is_empty(r)){
      set_error("Product not found")
      set_isdeleted(true)
    }
    console.log("product.delete.onload.formdata:",formdata)
    set_issubmitting(false)
  }

  useEffect(()=>{
    async_onload()
    return ()=> console.log("product.delete unmounting")
  },[])

  return (
    <>
      <Navbar />
      <main className="container">
        
        <h1 className="mt-2 mb-2">Product delete</h1>
        <Breadscrumb urls={MODCONFIG.SCRUMBS.GENERIC}/>

        <form className="row g-3" onSubmit={on_submit}>
          {success!==""? <AlertSimple message={success} type="success" />: null}
          {error!==""? <AlertSimple message={error} type="danger" />: null}
          {success!==""? <ToastSimple message={success} title="Success" isvisible={true} />: null}
          {error!==""? <ToastSimple message={error} title="Error" isvisible={true} />: null}


          <div className="col-md-3">
            <label htmlFor="txt-code_erp" className="form-label">Code</label>
            <input type="text" className="form-control border-0" id="txt-code_erp" placeholder="code in your system" 

              ref={refcode}
              value={formdata.code_erp}
              disabled 
            />
          </div>
          {
            isdeleted ? null:(
              <div className="col-md-3">
                <RefreshAsync issubmitting={issubmitting} fnrefresh={async_refresh} />
              </div>
            )
          }
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
              <img src={formdata.url_image} className="img-fluid" alt={formdata.url_image}/>
            </div>
          </div>

          <Sysfields sysdata={formdata} />
          {
            isdeleted ? null:(
              <div className="col-12">
                <SubmitAsync innertext="Delete" type="danger" issubmitting={issubmitting} />
              </div>   
            )
          }
        </form>
      </main>
      <Footer />
    </>
  )
}

export default ProductDelete;
