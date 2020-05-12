const Localdb = {

  is_string(v){
    return typeof v === "string"
  },

  to_string(obj){
    return JSON.stringify(obj)
  },

  select(k){
    const v = localStorage.getItem(k)
    const obj = JSON.parse(v)
    return obj
  },

  save(k,v){
    let val = v
    if(!this.is_string(val))
      val = this.to_string(val)

    localStorage.setItem(k,val)
    const test = this.select(k);
    console.log("after save:",test)
  },

  delete(k){
    localStorage.removeItem(k)
  },

  dropdb(){
    localStorage.clear()
  }
}

export default Localdb;