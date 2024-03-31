import React, { useState } from "react";
import AddTask from "../components/AddTask";
import DisplayTodos from "../Pages/DisplayTodos";

const Todos = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [dateRangeFilter] = useState("");

  const handleAddTask = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriorityFilterChange = (e) => {
    setPriorityFilter(e.target.value);
  };

  return (
    <div className="container border border-4 rounded-3 shadow p-4 mb-5">
      <div className="row mb-4 align-items-center">
        <div className="col-md-8">
          <div className="searchBar">
            <div className="filterOptions d-flex justify-content-start mb-3">
              <div className="d-lg-flex flex-lg-row d-md-flex flex-md-row gap-4 d-sm-flex flex-sm-col">
                <h6>Filter By: </h6>
                <input
                  type="text"
                  name="assignee"
                  id="assignee"
                  placeholder="Assignee Name"
                  className="border border-0 rounded-2 px-lg-3 mx-sm-3"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <select
                  name="priority"
                  id="priority"
                  className="outline-0 border border-0 rounded-2 px-lg-3 mx-sm-3 text-secondary"
                  value={priorityFilter}
                  onChange={handlePriorityFilterChange}
                >
                  <option selected value="all">
                    Priority
                  </option>
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-end"> {/* Adjusted column to right align */}
          {/* Add New Task Button */}
          <button
            type="button"
            className="btnColor rounded-1 border border-0 text-white fw-semibold px-5 btn btn-dark"
            onClick={handleAddTask}
          >
            Add New Task
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <DisplayTodos
            searchQuery={searchQuery}
            priorityFilter={priorityFilter}
            dateRangeFilter={dateRangeFilter}
          />
        </div>
      </div>

      {/* Modal backdrop */}
      <div className={`${showModal ? "modal-backdrop fade show" : ""}`}></div>
      <AddTask showModal={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default Todos;
