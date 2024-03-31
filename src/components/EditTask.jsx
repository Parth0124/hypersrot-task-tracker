import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateTodos } from "../redux/reducer";

const mapDispatchToProps = (dispatch) => {
  return {
    updateTodo: (obj) => dispatch(updateTodos(obj)),
  };
};


const EditTask = ({ item, updateTodo, handleClose, showEditModal }) => {
  const [title, setTitle] = useState(item ? item.title : "");
  const [description, setDescription] = useState(item ? item.description : "");
  const [priority, setPriority] = useState(item ? item.priority : "");
  const [team, setTeam] = useState(item ? item.team : "");
  const [assignee, setAssignee] = useState(item ? item.assignee : "");
  const [status, setStatus] = useState(item ? item.status : "pending");

  const handleSubmit = () => {
    updateTodo({
      id: item.id,
      title: title,
      description: description,
      priority: priority,
      team: team,
      assignee: assignee,
      status: status,
      completed: item.completed, // Retain the original completed status
      progress: item.progress,
      deployed: item.deployed,
      deferred: item.deferred,
    });

    handleClose();
  };

   // Store the original values on mount
   useEffect(() => {
    setTitle(item ? item.title : "");
    setDescription(item ? item.description : "");
    setPriority(item ? item.priority : "");
    setTeam(item ? item.team : "");
    setAssignee(item ? item.assignee : "");
    setStatus(item ? item.status : "pending");
  }, [item]);

  const handleReset = () => {
    // Reset the form fields to their original values
    setTitle(item ? item.title : "");
    setDescription(item ? item.description : "");
    setPriority(item ? item.priority : "");
    setTeam(item ? item.team : "");
    setAssignee(item ? item.assignee : "");
    setStatus(item ? item.status : "pending");
  };

  return (
    <div className={`popup modal fade ${showEditModal ? 'show' : ''}`} style={{ display: showEditModal ? 'block' : 'none' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">EDIT TASK</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label htmlFor="title" className="col-form-label fw-semibold">Title:</label>
                <div>
                  <input type="text" name="title" className="form-control border border-secondary-subtle border-2"
                    id="title" value={title} onChange={(e) => setTitle(e.target.value)} readOnly/>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="description" className="col-form-label fw-semibold">Description:</label>
                <div>
                  <textarea className="form-control border border-secondary-subtle border-2" name="description" id="description" rows="2"
                    value={description} onChange={(e) => setDescription(e.target.value)} readOnly></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="team" className="col-form-label fw-semibold">Team:</label>
                <div>
                  <input type="text" className="form-control border border-secondary-subtle border-2" id="team" name="team"
                    value={team} onChange={(e) => setTeam(e.target.value)} readOnly />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="assignee" className="col-form-label fw-semibold">Assignee:</label>
                <div>
                  <input type="text" className="form-control border border-secondary-subtle border-2" id="assignee" name="assignee"
                    value={assignee} onChange={(e) => setAssignee(e.target.value)} readOnly/>
                </div>
              </div>
              <div className="row mb-3 d-flex gap-2">
                <label htmlFor="priority" className="col-md-2 col-form-label fw-semibold">Priority:</label>
                <div className="col-sm-3 col-md-3">
                  <select className="form-select border border-secondary-subtle bg-white border-2" id="priority" name="priority"
                    value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option>P1</option>
                    <option value="P0">P0</option>
                    <option value="P1">P1</option>
                    <option value="P2">P2</option>
                  </select>
                </div>
                <label htmlFor="status" className="col-md-2 col-form-label fw-semibold">Status:</label>
                <div className="col-sm-3 col-md-4">
                  <select className="form-select border border-secondary-subtle bg-white border-2" id="status" name="status"
                    value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pending">Pending</option>
                    <option value="progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="deployed">Deployed</option>
                    <option value="deferred">Deferred</option>
                  </select>
                </div>
              </div>
            
              <div className="row d-flex justify-content-center gap-3">
              <button type="submit" className="btnColor w-25 border border-0 rounded-1 text-white">Submit</button>
              <button type="button" className="btnColor w-25 border border-0 rounded-1 text-white" onClick={handleReset}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(EditTask);
