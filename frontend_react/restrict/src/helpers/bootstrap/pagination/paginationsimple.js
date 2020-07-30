import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";

function PaginationSimple({objconf}){

  const [npages, set_npages] = useState(0)
  //const [npages, set_npages] = useState(0)

  const on_load = () => {
    const ipages = Math.ceil(objconf.foundrows / objconf.ippage)
    alert(ipages)
    set_npages(ipages)
  }

  useEffect(()=>{
    on_load()
    return ()=> console.log("paginationsimple unmounting")
  },[])  


  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">

        <li className="page-item">
          <a className="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        {

        }
        <li className="page-item">
          <NavLink className="page-link" exact to={"/admin/products/1"}>1</NavLink>
        </li>
        
        <li className="page-item">
          <a className="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>

      </ul>
    </nav>
  )
}

export default PaginationSimple;
