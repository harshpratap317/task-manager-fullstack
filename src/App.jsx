
import { useState, useEffect } from "react";

import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import Login from "./components/Login";

function App() {
  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  // Add task
  async function addTask() {
    if (task.trim() === "") {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: task,
        }),
      });

      const newTask = await response.json();

      if (!response.ok) {
        console.log("Task API error:", newTask.message);
        return;
      }

      setTasks([...tasks, newTask]);
      setTask("");
    } catch (error) {
      console.log("Error adding task:", error);
    }
  }

  // Delete task
  async function deleteTask(id) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  }

  // Start editing
  function startEdit(id) {
    const selectedTask = tasks.find((task) => task._id === id);

    if (!selectedTask) {
      return;
    }

    setEditIndex(id);
    setEditTask(selectedTask.title);
  }

  // Save edited task
  async function saveEdit() {
    const token = localStorage.getItem("token");

    if (editTask.trim() === "") {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${editIndex}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: editTask,
          }),
        }
      );

      const updatedTask = await response.json();

      if (!response.ok) {
        console.log("Task API error:", updatedTask.message);
        return;
      }

      setTasks(
        tasks.map((task) =>
          task._id === editIndex ? updatedTask : task
        )
      );

      setEditIndex(null);
      setEditTask("");
    } catch (error) {
      console.log("Error updating task:", error);
    }
  }

  // Complete / Undo task
  async function toggleComplete(id) {
    const token = localStorage.getItem("token");

    const selectedTask = tasks.find((task) => task._id === id);

    if (!selectedTask) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            completed: !selectedTask.completed,
          }),
        }
      );

      const updatedTask = await response.json();

      if (!response.ok) {
        console.log("Task API error:", updatedTask.message);
        return;
      }

      setTasks(
        tasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );
    } catch (error) {
      console.log("Error updating task:", error);
    }
  }

  // Get tasks from MongoDB
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.status === 401) {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          return;
        }

        if (!response.ok) {
          console.log("Task API error:", data.message);
          return;
        }

        setTasks(data);
      })
      .catch((error) => {
        console.log("Error fetching tasks:", error);
      });
  }, [isLoggedIn]);

  // Search + filter
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = (task.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesSearch && matchesFilter;
  });

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  // Show login page when user is not logged in
  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return (
    <div className="min-h-screen bg-gray-800 px-4 py-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="relative mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-200">
            Task Manager
          </h1>

          <p className="mt-2 text-gray-500">
            Organize your tasks and stay productive.
          </p>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
            className="absolute right-0 top-0 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-lg sm:p-8">

          {/* Task Statistics */}
          <div className="mb-6 grid grid-cols-3 gap-3">

            <div className="rounded-lg bg-blue-50 p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">
                {tasks.length}
              </p>

              <p className="text-sm text-gray-500">
                Total
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {completedCount}
              </p>

              <p className="text-sm text-gray-500">
                Completed
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {pendingCount}
              </p>

              <p className="text-sm text-gray-500">
                Pending
              </p>
            </div>

          </div>

          {/* Add Task */}
          <TaskForm
            task={task}
            setTask={setTask}
            addTask={addTask}
          />

          {/* Search */}
          <div className="mt-5">
            <SearchBar
              search={search}
              setSearch={setSearch}
            />
          </div>

          {/* Filter */}
          <div className="mt-5">
            <FilterButtons
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          {/* Task List */}
          <div className="mt-6">
            <TaskList
              tasks={filteredTasks}
              editIndex={editIndex}
              editTask={editTask}
              setEditTask={setEditTask}
              startEdit={startEdit}
              saveEdit={saveEdit}
              deleteTask={deleteTask}
              toggleComplete={toggleComplete}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

