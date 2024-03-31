import React from "react";

const DeleteTask = (props) => {
    const { item, message, onConfirm, onCancel } = props;
  return (
    <div key={item.id} className="popup modal fade show" style={{ display: 'block' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">DELETE TASK</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p className="fs-5 w-100">{message}</p>
            <div className="d-flex justify-content-between">
                <div className="title">
                    <h5> {item.title} </h5>
                </div>
                <div className="d-flex gap-4">
                    <button type="button" className="border border-0 text-white btnColor px-5 rounded-1 btn btn-danger" onClick={onConfirm}>Yes</button>
                    <button type="button" className="border border-0 text-white btnColor px-5 rounded-1 btn btn-success" onClick={onCancel}>No</button>
                </div>
            </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
