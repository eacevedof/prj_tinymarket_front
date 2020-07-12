
export const get_obj_entity = (objparam={filters:{}})=>{
  objselect.reset()

  objselect.table = `${table} r`
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