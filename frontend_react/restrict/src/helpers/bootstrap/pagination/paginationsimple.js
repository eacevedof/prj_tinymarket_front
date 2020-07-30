import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import { pr } from 'helpers/functions';

function PaginationSimple({objconf}){

  const [npages, set_npages] = useState(0)
  const [urls, set_urls] = useState([])
  //const [npages, set_npages] = useState(0)

  const on_load = () => {
    //pr(objconf,"obconf")
    const ipages = objconf.ippage>0 ? Math.ceil(objconf.foundrows / objconf.ippage) : 0
    const buttons = get_buttons(ipages)
    const arurls = [...Array(ipages).keys()].filter(i => buttons.includes(i+1)).map(ipage => ({url:`${objconf.url}/${ipage+1}`, text:ipage+1}))

    set_npages(ipages)
    set_urls(arurls)
  }

  const get_buttons = ipages => {

    if(ipages==0) return []
    if(ipages==1) return [1]

    const ipage = parseInt(objconf.page)
    //alert(ipage)
    const ibuttons = 8
    
    const buttons = []

    //agrego 3 por la izq
    buttons.push(ipage - 1)
    buttons.push(ipage - 2)
    buttons.push(ipage - 3)
    
    //agrego la pag actual
    buttons.push(ipage)

    //agrego 3 por la derecha
    buttons.push(ipage + 1)
    buttons.push(ipage + 2)
    buttons.push(ipage + 3)

    
    //si hay negativos tengo que sumar estos a los positivos
    const inegatives = buttons.filter(i => i < 1).length

    //rellleno las posiciones negativas con positivos
    const t = [...Array(ibuttons - (inegatives+buttons.length)).keys()].forEach(i => {
      buttons.push(ipage+4+i)
    })

    //pr(buttons,"buttons"); return []
    //quito los que estan fuera de los límites [1-n]
    const butsvalid = [1,...buttons.filter(i => i>1 && i<ipages).sort((a,b) => a-b),ipages]
    
    //pr(butsvalid,"butsvalid")
    return butsvalid

  }

  useEffect(()=>{
    on_load()
    return ()=> console.log("paginationsimple unmounting")
  },[objconf.page, objconf.foundrows])

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {
          objconf.page >1 ? (
            <li className="page-item">
              <NavLink className="page-link" exact to={objconf.url.concat(`/${parseInt(objconf.page)-1}`)}>&laquo;</NavLink>
            </li>
          ):null
        }

        {
          urls.map((objurl,i) => (
            objurl.text==objconf.page ?
              (<li key={i} className="page-item active">
              <NavLink className="page-link" exact to={objurl.url}>{objurl.text}</NavLink>
              </li>)
              :
              (<li key={i} className="page-item">
              <NavLink className="page-link" exact to={objurl.url}>{objurl.text}</NavLink>
              </li>)          
          ))
        }
        
        {
          objconf.page >1 ? (
            <li className="page-item">
              <NavLink className="page-link" exact to={objconf.url.concat(`/${parseInt(objconf.page)+1}`)}>&raquo;</NavLink>
            </li>
          ):null
        }

      </ul>
    </nav>
  )
}

export default PaginationSimple;
