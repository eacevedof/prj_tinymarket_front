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
    const arurls = [...Array(ipages).keys()].map(ipage => `${objconf.url}/${ipage+1}`)
    const buttons = get_buttons(ipages)

    pr(buttons,"buttons")
    //pr(arurls,"arurls")
    set_npages(ipages)
    set_urls(arurls)
    
  }

  const get_buttons = ipages => {

    if(ipages==0) return []
    if(ipages==1) return [1]

    const ipage = parseInt(objconf.page)
    //alert(ipage)
    const ibuttons = 10
    
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
    const t = [...Array(ibuttons - inegatives).keys()].forEach(i => {
      buttons.push(ipage+3+i)
    })

    //pr(buttons,"buttons"); return []
    //quito los que estan fuera de los límites [1-n]
    const butsvalid = buttons.filter(i => i>1 && i<ipages).sort((a,b) => a-b)//.shift("...").shift(1).push("...").push(ipages)
    pr(butsvalid,"butsvalid")
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
              <NavLink className="page-link" exact to={objconf.url.concat(`/${objconf.page-1}`)}>&laquo;</NavLink>
            </li>
          ):null
        }

        {
          urls.map((strurl,i) => (
            (i+1)==objconf.page ?
              (<li key={i} className="page-item active">
              <NavLink className="page-link" exact to={strurl}>{i+1}</NavLink>
              </li>)
              :
              (<li key={i} className="page-item">
              <NavLink className="page-link" exact to={strurl}>{i+1}</NavLink>
              </li>)          
          ))
        }
        
        {
          objconf.page >1 ? (
            <li className="page-item">
              <NavLink className="page-link" exact to={objconf.url.concat(`/${objconf.page+1}`)}>&raquo;</NavLink>
            </li>
          ):null
        }

      </ul>
    </nav>
  )
}

export default PaginationSimple;
