import React, {useContext} from 'react';
import {GlobalContext} from "../context/global_context"

function ProductCard() {

  const {selproduct} = useContext(GlobalContext)

  return (
    <div className="card" >
      <img
          className="card-img-top img-fluid img-thumbnail" 
          src="http://www.elchalanaruba.com/wp-content/uploads/2016/07/el-chalan-tallarin-verde-con-bisteck-imagen-1-170x170.jpg" 
          alt={selproduct.description}
      />
      <div className="card-body">
      <h5><strong>{selproduct.description}</strong></h5>
      <p className="card-text">{selproduct.description_full}</p>
      </div>
    </div>
  )
}

export default ProductCard;
