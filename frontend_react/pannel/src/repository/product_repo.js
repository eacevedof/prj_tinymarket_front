const ProductRepo = {
  products: [],
  
  findById(id){
    const arres = this.products.filter(product => {
      //console.log("ProductRepo.findbyid.product",product.id,"id:",id)
      return product.id === id
    })
    if(arres.length>0)
      return arres[0]
    return null
  }

}

export default ProductRepo