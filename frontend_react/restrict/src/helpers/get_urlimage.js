const BASE_URL = process.env.REACT_APP_BASEURLAPI

export default function get_urlimage(prodimg){
  const defimage = BASE_URL+"/pictures/products/product_0.png"
  //alert(prodimg)
  if(prodimg == null) return defimage
  
  if(prodimg.includes("http")) return prodimg

  return BASE_URL+"/pictures/products/"+prodimg
}
