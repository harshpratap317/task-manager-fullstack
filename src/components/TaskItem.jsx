function TaskItem({
  task,
  editIndex,
  editTask,
  setEditTask,
  startEdit,
  saveEdit,
  deleteTask,
  toggleComplete,
}) {
  const isEditing = editIndex === task._id;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {isEditing ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={editTask}
            onChange={(e) => setEditTask(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
          />

          <button
            onClick={saveEdit}
            className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={`text-lg ${
              task.completed
                ? "text-gray-400 line-through"
                : "text-gray-800"
            }`}
          >
            {task.title}
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => toggleComplete(task._id)}
              className={`rounded-lg px-3 py-2 text-sm font-medium text-white ${
                task.completed
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>

            <button
              onClick={() => startEdit(task._id)}
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;