import React, {useEffect} from 'react';
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import OrderTable from "./order_table"
import "../../index.css"
import HrefDom from "../../helpers/href_dom"

function OrderDetail({order,set_order}) {

  useEffect(()=>{
    console.log("orderdetail.useffect.order",order)
    HrefDom.document_title("ECH | Order")
  },[])

  return (
    <div className="wrapper">
      <div className="main-panel">
        <Navbar order={order} />
        <div className="content">
          <div className="container-fluid z-index-2000">
            <OrderTable order={order} set_order={set_order} />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default OrderDetail;
