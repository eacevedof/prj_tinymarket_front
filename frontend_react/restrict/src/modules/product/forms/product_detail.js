import React, {useContext, useState, useEffect} from 'react';
import {useParams} from "react-router-dom"
import {is_empty} from "helpers/functions"
//import {GlobalContext} from 'components/context/global_context';
import {async_get_by_id, async_update} from "../async/async_requests"

import Navbar from "components/common/navbar"
import Breadscrumb from 'components/common/bootstrap/breadscrumb';
import Footer from "components/common/footer"

function ProductDetail(){

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
    id_user: -1,
  })

 
  const async_onload = async () => {
    const r = await async_get_by_id(id)
    console.log("product.onload.r",r)
    const temp = {...formdata, ...r}
    //console.log("product.onload.formdata:")
    set_formdata(temp)
    console.log("product.onload.formdata:",formdata)
  }

  useEffect(()=>{
    async_onload()
    return ()=> console.log("product.insert unmounting")
  },[])

  return (
    <>
      <Navbar />
      <main className="container">
        
        <h1 className="mt-2 mb-2">Product Info</h1>
        <Breadscrumb arbreads={[]}/>
        <div>
          <div className="row">
            <div className="col-6">Nº</div>
            <div className="col-6">{formdata.id}</div>
          </div>          
          <div className="row">
            <div className="col-6">Code</div>
            <div className="col-6">{formdata.code_erp}</div>
          </div>
          
          <div className="row">
            <div className="col-6">Description</div>
            <div className="col-6">{formdata.description}</div>
          </div>

          <div className="row">
            <div className="col-6">Slug</div>
            <div className="col-6">{formdata.slug}</div>
          </div>          

          <div className="row">
            <div className="col-6">Description large</div>
            <div className="col-6">{formdata.description_full}</div>
          </div>

          <div className="row">
            <div className="col-6">Price</div>
            <div className="col-6">{formdata.price_sale}</div>
          </div>

          <div className="row">
            <div className="col-6">Price 1</div>
            <div className="col-6">{formdata.price_sale1}</div>
          </div>

          <div className="row">
            <div className="col-6">Display order</div>
            <div className="col-6">{formdata.order_by}</div>
          </div>

          <div className="row">
            <div className="col-6">Display</div>
            <div className="col-6">{formdata.display}</div>
          </div>

          <div className="row">
            <div className="col-6">Owner</div>
            <div className="col-6">{formdata.id_user}</div>
          </div>          

          <div className="row">
            <div className="col-3">Picture</div>
            <div className="col-9">
              <img src={formdata.url_image} className="img-fluid" />
            </div>
          </div>
                                                                   
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ProductDetail;
