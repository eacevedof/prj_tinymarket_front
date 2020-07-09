import React, {useContext, useState, useEffect, useCallback} from 'react'
import {GlobalContext} from '../context/global_context';
import DateTime from "../../helpers/date_time"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import _ from "lodash"
import OrderRepo from "../../repository/order_repo"
import FormUserOrder from "../user/form/form_order_user"
import OrderTrs from "./order_trs"

const BASE_URL = process.env.REACT_APP_BASEURLAPI

const OrderTable = () => {

  const {order} = useContext(GlobalContext)

  //const [products, set_products] = useState([])
  const [total, set_total] = useState(0)

  const get_total = products => {
    
    if(!products) return 0
    const sum = products
                  .map(product => parseFloat(product.price_sale) * parseFloat(product.units ? product.units:0))
                  .reduce((ac,price)=> ac = ac + price,0)
  
    return _.round(sum,2).toFixed(2)
  }

  
  const show_user_modal = (e) => {
  
  }

  useEffect(() => {
    //si cambia el pedido hay que refrescar los productos y el total
    console.log("ordertable.useeffect.order",order)
    const total = get_total(order.products)
    set_total(total)

  },[order]);

  
 
  return (
    <div className="card strpied-tabled-with-hover">
      <div className="card-header ">
          <h4 className="card-title">Cart</h4>
          <p className="card-category">
            {
                total>0?
                (
                  <>
                    <span>{order.products.length} products selected. <b>Total:  {total}</b></span>
                    <button 
                    type="button" 
                    className="btn btn-success btn-fill pull-right" 
                    onClick={show_user_modal}
                    data-toggle="modal"
                    data-target="#order-user-modal"                    
                    >
                    Process order&nbsp;
                    <i className="fa fa-truck fa-lg" aria-hidden="true"></i> &nbsp;
                    </button>  
                  </>
                )
                :
                ""
            }
          </p>
      </div>
      <div className="card-body table-full-width table-responsive">
      {
        total==0?
        (
          <div className="alert alert-primary">
            <span>
              <b> Your cart is empty</b> 
            </span>
          </div>
        )
        :
        (
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Units</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <OrderTrs />
            </tbody>
            <tfoot>
              <tr>
              <td colSpan="4"><span className="pull-right"><b>Total:</b></span></td>
              <td className="td-total"><span>{total}</span></td>
              </tr>
            </tfoot>
          </table>
        )
      }
      </div>
    </div>
    
    )
}

export default OrderTable;
