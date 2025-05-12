import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../index.css";

function Todolist() {
  const [todoItems, setTodoItems] = React.useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  const [orderBy, setOrderBy] = React.useState("latest");
  const [sortByPriority, setSortByPriority] = React.useState("all");
  const [sortBy, setSortBy] = React.useState("all");
  const [searchTerm, setSearchTerm] = React.useState("");

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const navigate = useNavigate();

  const onDelete = (id) => {
    const updatedTodos = todoItems.filter((todo) => todo.id !== id);
    setTodoItems(updatedTodos);
    toast.success("Selected Task deleted successfully");
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    toast.success("All Tasks fetched successfully");
  };

  //
  const filteredAndSortedTodos = todoItems
    .filter((todo) => {
      const matchesStatus = sortBy === "all" || todo.status === sortBy;
      const matchesPriority = sortByPriority === "all" || todo.priority === sortByPriority;
      const matchesSearch =
        todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesPriority && matchesSearch;
    })
    .sort((a, b) => {
      const timeA = Number(a.lastUpdatedAt);
      const timeB = Number(b.lastUpdatedAt);
      return orderBy === "latest" ? timeB - timeA : timeA - timeB;
    });

  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const paginatedTodos = filteredAndSortedTodos.slice(startIdx, endIdx);
  let totalPages = Math.ceil(filteredAndSortedTodos.length / itemsPerPage);
  if (totalPages === 0) {
    totalPages = 1;
  }

  return (
    <div>
      <div className="flex space-between items-center">
        <h1 className="todo-list-title">Todo List</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if(e.target.value!==""){
                toast.loading(`Searching Task with name/description: ${e.target.value}`);
              }
            }}
            style={{ padding: "1rem" }}
          />
          <span className="flex items-center">PageSize: </span>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // reset to page 1
              toast.success(`Selected PageSize: ${Number(e.target.value)} tasks/page`);
            }}
            style={{ padding: "1rem" }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <span className="flex items-center">Order By: </span>
          <select
            value={orderBy}
            onChange={(e) => {
              setOrderBy(e.target.value);
              toast.success(`Order Tasks by: ${e.target.value}`);
            }}
            style={{ padding: "1rem" }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
          <span className="flex items-center">Priority: </span>
          <select
            value={sortByPriority}
            onChange={(e) => {
              setSortByPriority(e.target.value);
              toast.success(`Sort Tasks by priority: ${e.target.value}`);
            }}
            style={{ padding: "1rem" }}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <span className="flex items-center">Status: </span>
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              toast.success(`Sort Tasks by status: ${e.target.value}`);
            }}
            style={{ padding: "1rem" }}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button onClick={() => navigate("/add")} className="primary-button">
            Add Task
          </button>
        </div>
      </div>
      {paginatedTodos.length == 0 && (
        <div className="flex items-center" style={{ marginTop: "2rem" }}>
          No Tasks to display
        </div>
      )}
      <div className="todo-list">
        {paginatedTodos.length != 0 &&
          paginatedTodos.map((todo, index) => (
            <div key={todo.id} className="todo-item">
              <div className="flex space-between">
                <div>
                  <h1 className="name">{todo.name}</h1>
                  <p>{todo.description}</p>
                </div>
                <div>
                  <div>
                    <div>
                      Created At:{" "}
                      {new Date(Number(todo.id)).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                    <div>
                      Last Updated At:{" "}
                      {new Date(Number(todo.lastUpdatedAt)).toLocaleString(
                        "en-IN",
                        {
                          timeZone: "Asia/Kolkata",
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-between  footer">
                <div className="flex">
                  <div className="status-priority">
                    <label>Status</label>
                    <span>{todo.status}</span>
                  </div>

                  <div className="status-priority">
                    <label>Priority</label>
                    <span>{todo.priority}</span>
                  </div>
                </div>

                <div className="flex action-btns">
                  <span
                    onClick={() => {
                      onDelete(todo.id);
                    }}
                  >
                    Delete
                  </span>
                  <span onClick={() => navigate(`/edit/${todo.id}`)}>Edit</span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex form-action-buttons" style={{ marginTop: "2rem" }}>
        <button
          //   disabled={currentPage === 1}
          onClick={() => {
            if (currentPage === 1) {
              toast.error("Can't go back beyond this page");
            } else {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
            }
          }}
          className="default-button"
        >
          Previous
        </button>
        <span className="flex items-center">
          <center>
            Page {currentPage} of {totalPages}
          </center>
        </span>
        <button
          //   disabled={currentPage === totalPages}
          onClick={() => {
            if (currentPage === totalPages) {
              toast.error("Can't go ahead beyond this page");
            } else {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
            }
          }}
          className="primary-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Todolist;
