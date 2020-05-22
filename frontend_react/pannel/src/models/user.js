import objorder from "./order"

const objuser = {
  id: null,
  fullname: "",
  email: "",
  phone: "",
  address: "",
  reset(){
    this.id = null
    this.fullname = ""
    this.email = ""
    this.phone = ""
    this.address = ""
  }
}

export default objorder;