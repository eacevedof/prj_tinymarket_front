import React, {useContext, useState, useEffect } from 'react';
import {GlobalContext} from "../context/global_context"
import FormOrderUser from "../user/form/form_order_user"
import _ from "lodash"

function OrderUserModal() {

   return (
    <>
    <div className="modal fade" id="order-user-modal" tabIndex="-1" role="dialog" aria-labelledby="order-user-modal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="order-user-modal"><b>User information</b></h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>          
          <div className="modal-body">
            <FormOrderUser />
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default OrderUserModal;
