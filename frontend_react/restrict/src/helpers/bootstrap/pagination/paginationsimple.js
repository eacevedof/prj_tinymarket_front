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
    //pr(arurls,"arurls")
    set_npages(ipages)
    set_urls(arurls)
    
  }

  const get_buttons = (ipages) => {
    if(ipages==0) return []
    if(ipages==1) return [1]

    const ipage = objconf.page
    const ibuttons = 10
    
    const buttons = []
    let ineg = 0

    buttons.push(ipage-1)
    buttons.push(ipage-2)
    buttons.push(ipage-3)

    buttons.push(ipage+1)
    buttons.push(ipage+2)
    buttons.push(ipage+3)

    //si hay negativos tengo que sumar estos a los positivos
    ineg = buttons.filter(i => i < 1).length

    [...Array(ineg).keys()].forEach(i => {
      buttons.push(3+i)
    });

    //quito los que estan fuera de los límites [1-n]
    const inlimit = buttons.filter(i => i>1 && i<ipages)
    

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
