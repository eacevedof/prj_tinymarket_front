//import objorder from "../models/order"
import LocalDb from "../helpers/local_db"
import _ from "lodash"

const OrderRepo = {
  order : {},
  
  get_products(){
    return this.order.products || []
  },

  is_product(objproduct){
    if(_.isEmpty(this.order)) return false

    return this.order.products.filter(product => product.id === objproduct.id).length>0
  },

  add_product(objproduct){
    
    if(_.isEmpty(this.order)) return false
    
    if(this.is_product(objproduct)){
      const res = _.unionBy([objproduct], this.order.products, 'id')
      this.order.products = res
    }
    else{
      this.order.products.push(objproduct)
    }
  },

  remove_units(objproduct){
    if(this.is_product(objproduct)){
      //console.log("remove.is_product true")
      if(objproduct.units===0){
        //console.log("remove.units === 0")
        _.remove(this.order.products, product => product.id === objproduct.id)
        //console.log("remove.res con prod borrado",res)
        //this.order.products = res
      }
      else{
        this.add_product(objproduct)
      }
    }
    else if(objproduct.units>0){
      this.add_product(objproduct)
    }
  },

  remove_product(prodid){
    const products = this.order.products.filter(product => product.id !== prodid)
    console.log("removed prodid",prodid,"products cleaned",products)
    this.order.products = products
  },

  get_product(id){
    if(_.isEmpty(this.order)) return false
    
    const products = this.order.products
    const res = products.filter(product => product.id === id)
    if(res.length>0)
      return res[0]
    return null
  },

  get_units(prodid){
    const product = this.get_product(prodid)
    if(product)
      return product.units
    return 0
  },

  get_num_products(){
    return this.order.products.length
  },

  save(){
    LocalDb.save("order",this.order)
  }

}

export default OrderRepo