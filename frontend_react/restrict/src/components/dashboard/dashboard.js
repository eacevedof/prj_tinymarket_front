import React, {useContext, useState, useEffect} from 'react';
import {GlobalContext} from "../context/global_context"
import Navbar from "../common/navbar"
import Footer from "../common/footer"
import LoadingWheel from "../common/loading_wheel"
import NotificationError from "../common/notifications/notification_error"

import HrefDom from "../../helpers/href_dom"
import Api from "../../providers/api"

function Dashboard() {
  
  const {is_loading, set_is_loading, set_products, search} = useContext(GlobalContext)
  const [is_error, set_is_error] = useState(false)


  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Products</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Products</a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Orders</h5>
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                <a href="#" className="btn btn-primary">Orders</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />      
    </>
  )
}

export default Dashboard;
