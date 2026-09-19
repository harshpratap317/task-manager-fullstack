function TaskForm({ task, setTask, addTask }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        placeholder="Enter a new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />

      <button
        onClick={addTask}
        className="rounded-lg bg-blue-600 px-9 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;