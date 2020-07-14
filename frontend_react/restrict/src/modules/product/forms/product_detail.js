import React from 'react';
import Navbar from "components/common/navbar"
import Breadscrumb from 'components/common/bootstrap/breadscrumb';
import Footer from "components/common/footer"
import {GlobalContext} from 'components/context/global_context';

function ProductDetail() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Breadscrumb arbreads={[]}/>
        <h1 className="mt-2 mb-2">Product detail</h1>
        <form className="row g-3">
          <div className="col-auto">
          <label htmlFor="staticEmail2" className="sr-only">Email</label>
          <input type="text" readonly className="form-control-plaintext" id="staticEmail2" value="email@example.com" />
          </div>
          <div className="col-auto">
          <label htmlFor="inputPassword2" className="sr-only">Password</label>
          <input type="password" className="form-control" id="inputPassword2" placeholder="Password" />
          </div>
          <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">Confirm identity</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  )
}

export default ProductDetail;
