import React from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const DisplayTodos = (props) => {
  const { searchQuery, priorityFilter, dateRangeFilter } = props;

  // Array of custom background colors for cards
  const customCardColors = ["#9a9999", "#ff8c00", "#10a710", "#302579", "#e9967a"];

  return (
    <div className="container">
      <div className="row cards">
        {["pending", "progress", "completed", "deployed", "deferred"].map(
          (status, index) => (
            <div className="col" key={status}>
              <div
                className="card"
                
              >
                <div className="card-header text-center text-white fw-semibold" style={{ backgroundColor: customCardColors[index] }}>
                  {status[0].toUpperCase() + status.slice(1)}
                </div>
                <div className="card-body p-2">
                  {props.todos.length > 0 &&
                    props.todos.map((item) => {
                      if (
                        // Check for searchQuery, priorityFilter, and dateRangeFilter
                        item.status === status &&
                        (searchQuery === "" || item.assignee.toLowerCase().includes(searchQuery.toLowerCase())) &&
                        (priorityFilter === "all" || item.priority === priorityFilter) &&
                        (dateRangeFilter === "" ||
                          (item.startDate && item.endDate &&
                            new Date(item.startDate) >= new Date(dateRangeFilter.split("-")[0]) &&
                            new Date(item.endDate) <= new Date(dateRangeFilter.split("-")[1])
                          )
                        )
                      )
                      {
                        const endDate = item.status === 'completed' ? new Date().toISOString() : null;
                        return <TodoItem key={item.id} item={{...item, endDate: endDate}} />;
                      }
                      return null;
                    })}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(DisplayTodos);
