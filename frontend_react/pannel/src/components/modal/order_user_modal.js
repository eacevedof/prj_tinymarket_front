import React, {useContext, useState, useEffect } from 'react';
import {GlobalContext} from "../context/global_context"
import FormOrderUser from "../user/form/form_order_user"
import _ from "lodash"

function OrderUserModal() {

   return (
    <>
    <div className="modal fade" id="order-user-modal" tabIndex="-1" role="dialog" aria-labelledby="order-user-modal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
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
