import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  editIndex,
  editTask,
  setEditTask,
  startEdit,
  saveEdit,
  deleteTask,
  toggleComplete,
}) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-8 text-center">
        <p className="text-gray-500">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          editIndex={editIndex}
          editTask={editTask}
          setEditTask={setEditTask}
          startEdit={startEdit}
          saveEdit={saveEdit}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;