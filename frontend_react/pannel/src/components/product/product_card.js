import React from 'react';

function ProductCard({product}) {
  return (
    <div className="card" >
      <img
          className="card-img-top img-fluid img-thumbnail" 
          src="http://www.elchalanaruba.com/wp-content/uploads/2016/07/el-chalan-tallarin-verde-con-bisteck-imagen-1-170x170.jpg" 
          alt={product.description}
      />
      <div className="card-body">
      <h5><strong>{product.description}</strong></h5>
      <p className="card-text">{product.description_full}</p>
      </div>
    </div>
  )
}

export default ProductCard;
