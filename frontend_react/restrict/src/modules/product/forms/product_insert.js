import React from 'react';
import Navbar from "../../../components/common/navbar"
import Breadscrumb from '../../../components/common/bootstrap/breadscrumb';
import Footer from "../../../components/common/footer"
import {GlobalContext} from '../../../components/context/global_context';

function ProductInsert() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Breadscrumb arbreads={[]}/>
        <h1 className="mt-2 mb-2">Product insert</h1>
        <form className="row g-3">
          <div className="col-md-6">
            <label htmlFor="txt-code_erp" className="form-label">Code</label>
            <input type="text" className="form-control" id="txt-code_erp" placeholder="code in your system" />
          </div>

          <div className="col-12">
            <label htmlFor="txt-description" className="form-label">Description</label>
            <input type="text" className="form-control" id="txt-description" placeholder="Name of product" />
          </div>
          
          <div className="col-12">
            <label htmlFor="txt-description_full" className="form-label">Description large</label>
            <textarea className="form-control" id="txt-description_full" rows="2" placeholder="large description use # if needed upto 3000 chars"></textarea>
          </div> 

          <div className="col-md-4">
            <label htmlFor="num-price_sale" className="form-label">Price</label>
            <input type="number" className="form-control" id="num-price_sale" placeholder="price in default currency" />
          </div>

          <div className="col-md-4">
            <label htmlFor="num-price_sale1" className="form-label">Price 1</label>
            <input type="number" className="form-control" id="num-price_sale1" />
          </div>

          <div className="col-md-4">
            <label htmlFor="num-order_by" className="form-label">Order</label>
            <input type="number" className="form-control" id="num-order_by" />
          </div>          

          <div className="col-md-6">
            <label htmlFor="sel-display" className="form-label">Display</label>
            <select id="sel-display" className="form-select">
              <option defaultValue>Choose...</option>
              <option value="0">No</option>
              <option value="1">Yes</option>
            </select>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label htmlFor="file-image" className="form-label">Picture: </label>
              <input type="file" className="form-control" id="file-image" />
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default ProductInsert;
