import React, {useState, useEffect} from 'react'
import DateTime from "../../helpers/date_time"
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
import _ from "lodash"
import OrderRepo from "../../repository/order_repo"
import FormUserOrder from "../user/form/form_user_order"

const BASE_URL = process.env.REACT_APP_BASEURLAPI

const OrderTable = ({order,set_order}) => {
  
  const [products, set_products] = useState(order.products)
  const [total, set_total] = useState(0)

  const get_total = products => {
    const sum = products
                  .map(product => parseFloat(product.price_sale) * parseFloat(product.units))
                  .reduce((ac,price)=> ac = ac + price,0)
  
    return _.round(sum,2).toFixed(2)
  }

  const Swal2 = withReactContent(Swal)

  const show_confirm_remove = (e) => {
    const button = e.currentTarget
    const prodid = parseInt(button.getAttribute("prodid"))
    OrderRepo.order = _.clone(order,true)
    const product = OrderRepo.get_product(prodid)
    
    Swal2.fire({
      title: <p>Are you sure to remove <b>{product.description_full}</b>?</p>,
      showConfirmButton: true,
      showCancelButton: true,
    }).then( isConfirmed => {
      if(isConfirmed.value){
        OrderRepo.remove_product(prodid)
        set_products(OrderRepo.get_products())
        set_order(OrderRepo.order)
        OrderRepo.save()
      }
    })
  }

  const show_sweet_user = (e) => {
    Swal2.fire({
      //title: <h2>User information</h2>,
      html: <FormUserOrder order={order} set_order={set_order} />,
      showConfirmButton: true,
      showCancelButton: true, 
      allowOutsideClick: false,
      preConfirm: () => {
        console.log(Swal2);
        return [
          //document.getElementById("input1").value,
          //document.getElementById("input2").value
        ];
      }
    }).then(mxobject => {
      if(_.has(mxobject,"dismiss"))
        return console.log(mxobject)
      
      console.log("values[]",mxobject.value);
      Swal2.fire({
        title: <p>Are you sure to continue?</p>,
        showConfirmButton: true,
        showCancelButton: true,
      }).then(isConfirmed => {
        if(isConfirmed.value){
          console.log("values[] II ",mxobject.value);
        }
      })
    });
  }

  useEffect(() => {
    //si cambia el pedido hay que refrescar los productos y el total
    console.log("ordertable.useeffect.order",order)
    set_products(order.products)
    const total = get_total(order.products)
    set_total(total)

  },[order]);

  const get_trs = products => products.map( (product,i) => (
    <tr key={DateTime.get_ymdhis()}>
      <td>{i+1}</td>
      <td>
        <b>{product.description}</b><br/>
        <sub>{product.description_full}</sub>
      </td>
      <td className="text-center">
        <img 
          src={`http://www.elchalanaruba.com/wp-content/uploads/2016/07/el-chalan-tallarin-verde-con-bisteck-imagen-1-170x170.jpg`} 
          alt={product.description_full}
          className="img-thumbnail"
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
  ))//get_trs

  const trs = get_trs(products)
 
  return (
    <div className="card strpied-tabled-with-hover">
      <div className="card-header ">
          <h4 className="card-title">Order Cart</h4>
          <p className="card-category">
            {
                total>0?
                (
                  <>
                    <span>{order.products.length} products selected. <b>Total:  {total}</b></span>
                    <button 
                    type="button" 
                    className="btn btn-success btn-fill pull-right" 
                    onClick={show_sweet_user}
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
              <b> Your order cart is empty</b> 
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
              { trs }      
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
