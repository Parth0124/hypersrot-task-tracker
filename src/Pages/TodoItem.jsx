import React, { useState, useEffect } from "react"; // Import useState and useEffect
import EditTask from "../components/EditTask"; // Import EditTask component
import DeleteTask from "../components/DeleteTask"; // Import DeleteTask component

const TodoItem = (props) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskStatus, setTaskStatus] = useState(props.item.status);
  const [buttonText, setButtonText] = useState("Assign"); // State for button text

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

  useEffect(() => {
    // Update buttonText based on taskStatus
    switch (taskStatus) {
      case "pending":
        setButtonText("Assign");
        break;
      case "completed":
        setButtonText("Completed");
        break;
      case "progress":
        setButtonText("In Progress");
        break;
      case "deployed":
        setButtonText("Deployed");
        break;
      case "deferred":
        setButtonText("Deferred");
        break;
      default:
        setButtonText("Assign");
        break;
    }
  }, [taskStatus]);

  const handleStatusChange = (newStatus) => {
    setTaskStatus(newStatus);
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
        <div>
          <button
            type="button"
            className={`btn btn-sm mt-3 ${
              taskStatus === "completed"
                ? "btn-success"
                : taskStatus === "progress"
                ? "btn-warning"
                : taskStatus === "deployed"
                ? "btn-primary"
                : taskStatus === "deferred"
                ? "btn-secondary"
                : taskStatus === "pending"
                ? "btn-info" // Use btn-info class when taskStatus is "pending"
                : "btn-success" // Default color when taskStatus is unknown
            } ${taskStatus !== "pending" && "disabled"}`}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {showEditModal && (
        <EditTask
          item={item}
          handleClose={() => setShowEditModal(false)}
          showEditModal={showEditModal}
          handleStatusChange={handleStatusChange}
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

export default TodoItem;
