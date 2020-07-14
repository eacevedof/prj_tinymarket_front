
import helpapify from "helpers/apify"
import {get_keys,is_defined} from "helpers/functions"

const query = {
  table: "app_product",
  alias: "t",
}

export const get_obj_delete = (objparam={fields:{},keys:[]},dbfields=[])=>{
  const objdelete = helpapify.delete
  objdelete.reset()
  objdelete.table = query.table

  if(!is_defined(objparam.keys)) return null
  //evita que se actualicen todos los registros que no son una entidad
  if(objparam.keys.length==0) return null

  if(is_defined(objparam.fields)){
    const onlyfields = dbfields.map(dbfield => dbfield.field_name)
    const fields = get_keys(objparam.fields)

    fields.forEach( field => {
      if(!onlyfields.includes(field))
        return
  
      //si el campo es clave
      if(objparam.keys.includes(field)){
        objdelete.where.push(`${field}='${objparam.fields[field]}'`)
      }
      else
        objdelete.fields.push({k:field,v:objparam.fields[field]})
    })    
  }

  return objdelete
}
