
import helpapify from "../../../../helpers/apify"
import {get_keys, is_empty} from "../../../../helpers/functions"

const query = {
  table: "app_product",
  alias: "t",
}

export const get_obj_insert = (objparam={fields:{}})=>{
  const objinsert = helpapify.insert
  objinsert.reset()
  objinsert.table = query.table

  if(!is_empty(objparam.fields)){
    const fields = get_keys(objparam.fields)
    fields.forEach( field => {
      objinsert.fields.push({k:field,v:objparam.fields[field]})
    })  
  }
  //pr(objinsert)
  return objinsert
}
