import React, {useContext, useState, useEffect } from 'react';
import {GlobalContext} from "../context/global_context"
import OrderRepo from "../../repository/order_repo"
import _ from "lodash"
import ProductCard from "../product/product_card"

function NumberModal() {

  const {selproduct, order, set_order} = useContext(GlobalContext)
  const [units, set_units] = useState(0)

  const on_add = ()=>{
    const prodid = selproduct.id
    OrderRepo.order = {...order}
    const orderunits = OrderRepo.get_units(prodid)
    console.log("on_add.orderunits",orderunits)
    const newunits = orderunits + 1
    set_units(newunits)
    console.log("on_add.units after set_units",newunits)
    const prodmodif = _.assign(selproduct,{units:newunits})
    console.log("on_add.prodmodif",prodmodif)
    OrderRepo.add_product(prodmodif)
    set_order(OrderRepo.order)
    OrderRepo.save()
    //con las nuevas unidades se guarda el pedido en local
  }

  const on_remove = () => {
    const prodid = selproduct.id
    OrderRepo.order = {...order}
    const orderunits = OrderRepo.get_units(prodid)
    const newunits = orderunits>0?orderunits-1:0
    set_units(newunits)
    console.log("on_remove.units",newunits)
    const prodmodif = _.assign(selproduct,{units:newunits})
    console.log("on_remove.prodmodif",prodmodif)
    OrderRepo.remove_units(prodmodif)
    set_order(OrderRepo.order)
    OrderRepo.save()
  }

  useEffect(() => {
    console.log("numbermodal.useffect.selproduct",selproduct)
    //cad vez que hay un nuevo producto tengo que setear sus unidades en 
    OrderRepo.order = {...order}
    const orderunits = OrderRepo.get_units(selproduct.id)
    set_units(orderunits)
  },[selproduct]);

  return (
    <>
    <div className="modal fade" id="number-modal" tabIndex="-1" role="dialog" aria-labelledby="number-modal" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                <label htmlFor="units" className="col-form-label">Units:</label>
                <input type="number" className="form-control" value={units} readOnly/>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                <div className="row padding-buttons">
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                    <button type="button" className="btn btn-danger btn-fill btn-md pull-left" onClick={on_remove}>
                      <i className="fa fa-minus-square fa-lg" aria-hidden="true"></i> 
                    </button>            
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                    <button type="button" className="btn btn-success btn-fill btn-md pull-left" onClick={on_add}>
                      <i className="fa fa-plus-square fa-lg" aria-hidden="true"></i> 
                    </button>
                  </div>
                </div>
              </div>
            </div>            
            <div className="row">        
              <ProductCard />
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default NumberModal;
