import helpapify from "helpers/apify"
import apidb from "providers/apidb"

const query = {
  table: "base_user",
  alias: "t",
  
  fields:[
    "t.alias",
  ],

}

const get_objselect = userid =>{
  const objselect = helpapify.select
  objselect.reset()

  objselect.table = `${query.table} ${query.alias}`
  objselect.foundrows = 1 //que devuelva el total de filas
    
  query.fields.forEach(fieldconf => objselect.fields.push(fieldconf)) 
  objselect.where.push(`t.id = '${userid}'`)

  return objselect
}

const async_get_useralias = async userid => {
  if(!userid || isNaN(userid))
    return null

  const query = get_objselect(userid)
  const r = await apidb.async_get_list(query)
  
  if(is_defined(r.result.length))
    return r.result[0].alias

  return r  

}

export default async_get_useralias