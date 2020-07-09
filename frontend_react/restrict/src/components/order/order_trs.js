import React, {useContext} from 'react';
import {GlobalContext} from '../context/global_context';
import _ from "lodash"
import DateTime from "../../helpers/date_time"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import OrderRepo from "../../repository/order_repo"
import get_urlimage from "../../helpers/get_urlimage"

function OrderTrs() {

  const {order, set_order} = useContext(GlobalContext)

  const Swal2 = withReactContent(Swal)

  const show_confirm_remove = (e) => {
    const button = e.currentTarget
    const prodid = parseInt(button.getAttribute("prodid"))
    OrderRepo.order = {...order}
    const product = OrderRepo.get_product(prodid)
    
    Swal2.fire({
      title: <p>Are you sure to remove <b>{product.description_full}</b>?</p>,
      showConfirmButton: true,
      showCancelButton: true,
    }).then( isConfirmed => {
      if(isConfirmed.value){
        OrderRepo.remove_product(prodid)
        set_order(OrderRepo.order)
        OrderRepo.save()
      }
    })
  }

   return (
    <>
    {
      order.products.map( (product,i) => (
        <tr key={DateTime.get_ymdhis()}>
          <td>{i+1}</td>
          <td>
            <b>{product.description}</b><br/>
            <sub>{product.description_full}</sub>
          </td>
          <td className="text-center">
            <img 
              src={get_urlimage(product.url_image)} 
              alt={product.description_full}
              className="img-thumbnail"
              height="270"
              width="270"
            />
          </td>
          <td className="text-right">
            <sub>{product.units} x </sub>
            <sub>{_.round(product.price_sale,2).toFixed(2)}</sub>
          </td> 
          <td className="text-right">
            <span>{_.round(product.price_sale * product.units,2).toFixed(2)}</span>
          </td>
          <td>
            <div className="input-group">
              <button 
                type="button" 
                className="btn btn-danger btn-fill pull-left" 
                prodid={product.id}
                onClick={show_confirm_remove}
                >
                <i className="fa fa-trash fa-lg" aria-hidden="true"></i>
              </button>
            </div>
          </td>
        </tr>
        )
      )
    }     
    </>
  )
}

export default OrderTrs;
