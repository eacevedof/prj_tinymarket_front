import helpapify from "../../helpers/apify"
import {is_defined, get_keys, isset, is_empty, is_key, pr} from "../../helpers/functions"

const objselect = helpapify.select

export const table = "app_product"

export const grid = {
  headers:[
    {
      text: 'nº',
      align: 'start',
      sortable: true,
      value: 'id',
    },
    { text: 'Action', value: 'colbuttons' },
    { text: 'Rem. IP', value: 'code_erp' },
    { text: 'Country', value: 'country' },
    { text: 'Whois', value: 'whois' },
    { text: 'Domain', value: 'domain' },
    { text: 'R. URI', value: 'request_uri' },
    { text: 'GET', value: 'hasget' },
    { text: 'POST', value: 'haspost' },
    { text: 'In BL', value: 'inbl' },
    { text: 'Day', value: 'insert_date' },
  ]
}

export const config = [
  {
    table:{
      name: "app_ip_request",
      alias: "r",

      fields:[
        {name: "id", label:"Nº"},
        {name: "code_erp", label:"Rem. IP"},
        {name: "insert_date", label:"Date"},
        {name: "domain", label:"Domain"},
        {name: "request_uri", label:"R. URI"},
        {name: "`get`", label:"GET"},
        {name: "post", label:"POST"},
      ]
    }
  },
  
]

const query = {
  table: "app_product",
  alias: "t",
  fields:[
    "t.id",
    "t.code_erp",
    "t.description",
    "t.description_full",
    "t.slug",
    "t.units_min",
    "t.units_max",
    "t.price_gross",
    "t.price_sale",
    "t.price_sale1",
    "t.price_sale2",
  ],

  joins:[
    
  ],

  where:[
    
  ],
}

export const get_obj_list = (objparam={filters:{}, page:{}, orderby:{}})=>{

  objselect.reset()
  pr(query)
  objselect.table = `${query.table} ${query.alias}`
  objselect.foundrows = 1 //que devuelva el total de filas
  objselect.distinct = 1  //que aplique distinct
  
  query.fields.forEach(fieldconf => objselect.fields.push(fieldconf))
  
  if(!is_empty(objparam.filters.fields)){
    //pr(objparam.filters,"objparam.filter")
    const strcond = objparam.filters
                    .fields
                    .map(filter => `${filter.field} LIKE '%${filter.value}%'`)
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

  objselect.limit.perpage = 1000
  objselect.limit.regfrom = 0
  if(!is_empty(objparam.page)){
    //pr(objparam.page,"page")
    objselect.limit.perpage = objparam.page.ippage
    objselect.limit.regfrom = objparam.page.ifrom
  }

  objselect.orderby.push(`${query.alias}.id DESC`)
  //pr(objselect,"get_obj_list.objselect")
  return objselect
}//get_list

export const get_obj_entity = (objparam={filters:{}})=>{
  objselect.reset()

  objselect.table = `${table} ${}`
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

export const get_obj_clone = (objparam={fields:{}},dbfields=[])=>{
  const objinsert = helpapify.insert
  objinsert.reset()
  objinsert.table = table

  if(!is_empty(objparam.fields)){
    
    const onlyfields = dbfields.map(dbfield => dbfield.field_name)
    const pks = dbfields.filter(dbfield => dbfield.is_pk == "1").map(dbfield => dbfield.field_name)
    //pr(onlyfields,"onlyfields")
    const fields = get_keys(objparam.fields)
    
    fields.forEach( field => {
      if(!is_empty(onlyfields)){
        //si no es campo de la tabla o está y es pk
        if(!onlyfields.includes(field) || pks.includes(field))
          return
      }

      objinsert.fields.push({k:field, v:objparam.fields[field]})
    })  
  }
  //pr(objinsert)
  return objinsert
}

export const get_obj_insert = (objparam={fields:{}})=>{
  const objinsert = helpapify.insert
  objinsert.reset()
  objinsert.table = table

  if(!is_empty(objparam.fields)){
    const fields = get_keys(objparam.fields)
    fields.forEach( field => {
      objinsert.fields.push({k:field,v:objparam.fields[field]})
    })  
  }
  //pr(objinsert)
  return objinsert
}

export const get_obj_update = (objparam={fields:{},keys:[]},dbfields=[])=>{
  const objupdate = helpapify.update
  objupdate.reset()
  objupdate.table = table

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
        objupdate.where.push(`${field}='${objparam.fields[field]}'`)
      }
      else
        objupdate.fields.push({k:field,v:objparam.fields[field]})
    })    
  }

  return objupdate
}

export const get_obj_detete = (objparam={fields:{},keys:[]})=>{
  const objdelete = helpapify.delete
  objdelete.reset()
  objdelete.table = table
  
  if(isset(objparam.fields) && isset(objparam.fields)){
    const fields = Object.keys(objparam.fields)
    fields.forEach( field => {
      if(!objparam.keys.includes(field))
        return
      objdelete.where.push(`${field}='${objparam.fields[field]}'`)
    })  
  }
  
  return objdelete
}