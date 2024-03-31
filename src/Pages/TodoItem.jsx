import React, { useState } from "react";
import { connect } from "react-redux";
import EditTask from "../components/EditTask";
import { removeTodos } from "../redux/reducer"; // Import the removeTodos action
import DeleteTask from "../components/DeleteTask";

const TodoItem = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskStatus, setTaskStatus] = useState(props.item.status);

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

  const handleAssign = () => {
    if (taskStatus !== "pending") {
      switch (taskStatus) {
        case "completed":
          setTaskStatus("progress");
          break;
        case "progress":
          setTaskStatus("deployed");
          break;
        case "deployed":
          setTaskStatus("deferred");
          break;
        case "deferred":
          setTaskStatus("completed");
          break;
        default:
          break;
      }
    }
  };

  const getButtonColorClass = () => {
    if (taskStatus === "pending") {
      return "btn btn-info"; // Green color for pending status
    }
    switch (taskStatus) {
      case "completed":
        return "btn btn-success";
      case "progress":
        return "btn btn-warning";
      case "deployed":
        return "btn btn-primary";
      case "deferred":
        return "btn btn-secondary";
      default:
        return "btn btn-success";
    }
  };

  const getButtonText = () => {
    switch (taskStatus) {
      case "pending":
        return "Assign";
      case "completed":
        return "Completed";
      case "progress":
        return "In Progress";
      case "deployed":
        return "Deployed";
      case "deferred":
        return "Deferred";
      default:
        return "Assign";
    }
  };

  return (
    <div
      key={item.id}
      className="card mb-3 border border-0 p-2"
      style={{ backgroundColor: "rgb(231, 230, 230)" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-0">
        <h6>{item.title}</h6>
        <span className="btnColor priority text-white rounded-1 px-1">
          {item.priority}
        </span>
      </div>
      <hr className="my-2" />
      <div>
        <p className="mb-1">{item.description}</p>
      </div>
      <div className="d-flex justify-content-between">
        <span className="fw-semibold">@{item.assignee}</span>
        <div className="position-relative">
          <i
            className="bi bi-three-dots-vertical btnColor text-white rounded-1 p-1"
            style={{ cursor: "pointer", fontSize: "10px" }}
            onClick={() => setShowOptions(!showOptions)}
          ></i>
          {showOptions && (
            <div
              className="moreBtn position-absolute start-100 translate-middle-y text-black rounded-2 px-2"
              style={{ zIndex: 100 }}
            >
              <button
                className="dropdown-item btnColor"
                onClick={handleEditModal}
              >
                Edit
              </button>
              <hr className="text-white m-1" />
              <button
                className="dropdown-item mt-1 btnColor"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <button
          type="button"
          className={`${getButtonColorClass()} btn-sm mt-3`}
          onClick={handleAssign}
          disabled={taskStatus === "pending"}
        >
          {getButtonText()}
        </button>
      </div>
      {showEditModal && (
        <EditTask
          item={item}
          handleClose={() => setShowEditModal(false)}
          showEditModal={showEditModal}
        />
      )}
      {/* Confirmation modal for delete */}
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
