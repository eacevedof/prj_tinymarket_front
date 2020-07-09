import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../context/global_context';
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import OrderTable from "./order_table"
import HrefDom from "../../helpers/href_dom"
import OrderUserModal from "../modal/order_user_modal"

function OrderDetail() {

  useEffect(()=>{
    //console.log("orderdetail.useffect.order",order)
    //console.log("orderdetail.useffect.search",search)
    
    HrefDom.document_title("ECH | Order")
  },[])

  return (
    <div className="wrapper">
      <Navbar />
      <div className="main-panel">
        <br id="totop" /><br/>
        <div className="content">
          <div className="container-fluid z-index-2000">
            <OrderTable />
          </div>
        </div>
        <Footer />
      </div>
      <OrderUserModal />
    </div>
  )
}

export default OrderDetail;
