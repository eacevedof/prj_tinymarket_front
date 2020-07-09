import React, {useEffect} from 'react';

function OrderDetail({text}) {



  return (
    <div className="modal fade modal-mini modal-primary" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header justify-content-center">
              <div className="modal-profile">
                  <i className="nc-icon nc-bulb-63"></i>
              </div>
          </div>
          <div className="modal-body text-center">
            <p>{text}</p>
          </div>
          <div className="modal-footer">
              <button type="button" className="btn btn-link btn-simple" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    )
    
  }
  
  export default OrderDetail;

