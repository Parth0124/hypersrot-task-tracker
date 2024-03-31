import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos } from "../redux/reducer";

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const AddTask = ({ addTodo, handleClose, showModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [team, setTeam] = useState("");
  const [assignee, setAssignee] = useState("");
  const [completedBy, setCompletedBy] = useState(""); // New state for "completed by" date

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title.trim() !== "") {
      const startDate = new Date().toISOString();
      addTodo({
        id: Math.floor(Math.random() * 1000),
        title: title,
        description: description,
        priority: priority,
        team: team,
        assignee: assignee,
        status: "pending",
        completed: false,
        startDate: startDate,
        completedBy: completedBy, // Include completed by date
      });
      handleClose();
      // Clear form fields
      setTitle("");
      setDescription("");
      setPriority("");
      setTeam("");
      setAssignee("");
      setCompletedBy("");
    }
  };

  return (
    <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" >
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">CREATE A TASK</h5>
          <button type="button" className="btn-close" onClick={handleClose}></button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="title" className="col-sm-3 col-form-label fw-semibold">Title: </label>
              <div className="col-sm-9">
                <input type="text" name='title' className="form-control border border-secondary-subtle border-2" 
                id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="description" className="col-sm-3 col-form-label fw-semibold">Description: </label>
              <div className="col-sm-9">
                <textarea className="form-control border border-secondary-subtle border-2" name='description' id="description" rows="2"
                value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="team" className="col-sm-3 col-form-label fw-semibold">Team: </label>
              <div className="col-sm-9">
                <input type="text" className="form-control border border-secondary-subtle border-2" id="team" name='team'
                value={team} onChange={(e) => setTeam(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="assignees" className="col-sm-3 col-form-label fw-semibold">Assignees: </label>
              <div className="col-sm-9">
                <input type="text" className="form-control border border-secondary-subtle border-2" id="assignees" name='assignees'
                value={assignee} onChange={(e) => setAssignee(e.target.value)}/>
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="completedBy" className="col-sm-3 col-form-label fw-semibold">Due: </label>
              <div className="col-sm-9">
                <input type="date" className="form-control border border-secondary-subtle border-2" id="completedBy" name='completedBy'
                value={completedBy} onChange={(e) => setCompletedBy(e.target.value)} />
              </div>
            </div>
            <div className="row mb-3 d-flex flex-row">
              <label htmlFor="priority" className="col-sm-3 col-form-label fw-semibold">Priority: </label>
              <div className="col-sm-3">
                <select className="form-select border border-secondary-subtle border-2" id="priority" name='priority'
                value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option>Select</option>
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </select>
              </div>
            </div>
            <div className="row d-flex justify-content-end gap-3">
              <button type="button" className="btnColor w-25 border border-0 rounded-1 text-white btn btn-dark" onClick={handleClose}>Close</button>
              <button type="submit" className="btnColor w-25 border border-0 rounded-1 text-white btn btn-dark" >Save</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  </div>
    
  );
};

export default connect(null, mapDispatchToProps)(AddTask);
