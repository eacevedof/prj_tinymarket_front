import React, {useContext,useEffect, useState} from 'react'
import {GlobalContext} from '../context/global_context';
import OrderRepo from "../../repository/order_repo"
import ProductRepo from "../../repository/product_repo"
import _ from "lodash"


const BASE_URL = process.env.REACT_APP_BASEURLAPI

const ProductTable = () => {
  
  const {selproduct, set_selproduct, order, set_order, products, search} = useContext(GlobalContext)


  const show_modal = (e)=>{
    //OrderRepo.order = _.clone(order,true)
    const button = e.currentTarget
    const prodid = parseInt(button.getAttribute("prodid"))
    
    ProductRepo.products = _.clone(products,true)
    const objproduct = ProductRepo.findById(prodid)

    set_selproduct(objproduct)
  }


  useEffect(() => {
    console.log("producttable.useEffect.order",order)
    console.log("producttable.useEffect.products",products)
  },[products]);


  const get_trs = products => products.map( (product,i) => {
    
    OrderRepo.order = _.clone(order,true)
    const units = OrderRepo.get_units(product.id)

    return (
      <tr key={product.id}>
        <td>{i+1}</td>
        <td>
          <b>{product.description}</b><br/>{product.description_full}
          {
            units>0 ? <><br/><span className="n-items">{units} in cart</span></> :null
          }
        </td>
        <td className="text-center">
          <button type="button" className="btn-empty" onClick={show_modal} prodid={product.id}>
            <img 
              src={`http://www.elchalanaruba.com/wp-content/uploads/2016/07/el-chalan-tallarin-verde-con-bisteck-imagen-1-170x170.jpg`} 
              alt={product.description_full}
              className="img-thumbnail"
              data-toggle="modal"
              data-target="#number-modal"
              />
          </button>
        </td>
        <td><span className="pull-right">{_.round(product.price_sale,2).toFixed(2)}</span></td>
        <td>
          <div className="input-group">
            <button type="button" 
              className="btn btn-primary btn-fill pull-left btn-block" 
              onClick={show_modal} prodid={product.id}
              data-toggle="modal"
              data-target="#number-modal"
              >
              <i className="fa fa-cart-plus fa-lg" aria-hidden="true"></i>
              &nbsp;
            </button>
        </div>
        </td>
      </tr>
    ) //return
})//get_trs

  const trs = get_trs(products)
  
  return (
    <>
    <div className="card strpied-tabled-with-hover">
      <div className="card-header ">
        <h4 className="card-title">Items <small>({products.length})</small></h4>
          {
            search !== "" ? <p className="card-category">Filtered by: <span className="text-info">{search}</span></p> : null
          }
      </div>
      <div className="card-body table-full-width table-responsive">
        
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { trs }      
          </tbody>
        </table>
        
      </div>
    </div>
    </>
    )
}

export default ProductTable;