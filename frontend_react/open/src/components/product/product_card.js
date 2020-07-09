import React, {useContext} from 'react';
import {GlobalContext} from "../context/global_context"
import get_urlimage from "../../helpers/get_urlimage"

function ProductCard() {

  const {selproduct} = useContext(GlobalContext)

  return (
    <div className="card" >
      <img
          className="card-img-top img-fluid img-thumbnail" 
          src={get_urlimage(selproduct.url_image)} 
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
