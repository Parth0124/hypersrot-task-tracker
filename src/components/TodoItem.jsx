import React, { useState } from "react";
import { connect } from "react-redux";
import EditTask from "./EditTask";
import { removeTodos } from "../redux/reducer"; // Import the removeTodos action
import DeleteTask from "./DeleteTask";

const TodoItem = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskStatus, setTaskStatus] = useState(props.item.status);
  const [completedByDate, setCompletedByDate] = useState(""); // New state for completed by date

  const { item, removeTodo } = props;

  const handleEditModal = () => {
    setShowEditModal(true);
    setShowOptions(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirmation(true);
    setShowOptions(false);
  };

  const confirmDelete = () => {
    removeTodo(item.id);
    setShowDeleteConfirmation(false);
  };

  let buttonText = "Assign";

  const handleAssign = () => {
    switch (taskStatus) {
      case "pending":
        buttonText = "Assign";
        break;
      case "completed":
        buttonText = "Completed";
        break;
      case "progress":
        buttonText = "In Progress";
        break;
      case "deployed":
        buttonText = "Deployed";
        break;
      case "deferred":
        buttonText = "Deferred";
        break;
      default:
        break;
    }

    console.log("Assigning task with status:", taskStatus);
    console.log("Button text:", buttonText);
  };

  const handleStatusChange = (newStatus) => {
    setTaskStatus(newStatus);
  };

  return (
    <div key={item.id} className="card mb-3 border border-0 p-2" style={{backgroundColor: "rgb(231, 230, 230)"}}>
        <div className="d-flex justify-content-between align-items-center mb-0">
            <h6>{item.title}</h6>
            <span className="btnColor priority text-white rounded-1 px-1">{item.priority}</span>
        </div>
        <hr className="my-2"/>
        <div>
          <p className="mb-1">{item.description}</p>
        </div>
        {/* Display completed by date */}
        {item.completedBy && (
          <div className="mb-1">
            <span className="fw-semibold">Due: </span>
            <span>{item.completedBy}</span>
          </div>
        )}
        <div className="d-flex justify-content-between">
          <span className="fw-semibold">@{item.assignee}</span>
          <div className="position-relative">
            <i
              className="bi bi-three-dots-vertical btnColor text-white rounded-1 p-1"
              style={{ cursor: "pointer",fontSize: "10px" }}
              onClick={() => setShowOptions(!showOptions)}
            ></i>
            {showOptions && (
              <div className="moreBtn position-absolute start-100 translate-middle-y text-black rounded-2 px-2" style={{ zIndex: 100 }}>
                <button className="dropdown-item btnColor" onClick={handleEditModal}>
                    Edit
                </button>
                <hr className="text-white m-1"/>
                <button className="dropdown-item mt-1 btnColor" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div>
          <button type="button" className={`btnColor text-white border border-0 px-4 mt-3 rounded-2 assign ${taskStatus !== "pending" && "disabled"}`} onClick={handleAssign} disabled={taskStatus !== "pending"}>
              {buttonText}
          </button>
        </div>
        {showEditModal && (
          <EditTask item={item} handleClose={() => setShowEditModal(false)} showEditModal={showEditModal} handleStatusChange={handleStatusChange} />
        )}
        {showDeleteConfirmation && (
          <DeleteTask
            item={item}
            message="Do You Wish to Delete Task"
            onConfirm={confirmDelete}
            onCancel={() => setShowDeleteConfirmation(false)}
          />
        )}
  </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeTodo: (id) => dispatch(removeTodos(id)), // Dispatch the removeTodos action with the task id
  };
};

export default connect(null, mapDispatchToProps)(TodoItem);
