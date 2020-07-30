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
            <li key={i} className="page-item">
              <NavLink className="page-link" exact to={strurl}>{i+1}</NavLink>
            </li>
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
