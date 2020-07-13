
import {is_empty} from "../../../helpers/functions"

const query = {
  table: "app_product",
  alias: "t",
}

export const get_obj_entity = (objparam={filters:{}})=>{
  objselect.reset()

  objselect.table = `${query.table} r`
  objselect.foundrows = 1 //que devuelva el total de filas
  objselect.distinct = 1  //que aplique distinct
    
  query.fields.forEach(fieldconf => objselect.fields.push(fieldconf))
    
  if(!is_empty(objparam.filters.fields)){
    //pr(objparam.filters,"objparam.filter")
    const strcond = objparam.filters
                    .fields
                    .map(filter => `${filter.field}='${filter.value}'`)
                    .join(` ${objparam.filters.op} `)
    //pr(strcond,"strcond")
    objselect.where.push(`(${strcond})`)
  }
  
  if(!is_empty(query.joins)){
    query.joins.forEach(join => objselect.joins.push(join))
  }

  if(!is_empty(query.where)){
    query.where.forEach(cond => objselect.where.push(cond))
  } 
    
  return objselect
}
