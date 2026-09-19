function FilterButtons({ filter, setFilter }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setFilter("all")}
        className={`rounded-lg px-4 py-2 font-medium ${
          filter === "all"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        All
      </button>

      <button
        onClick={() => setFilter("pending")}
        className={`rounded-lg px-4 py-2 font-medium ${
          filter === "pending"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Pending
      </button>

      <button
        onClick={() => setFilter("completed")}
        className={`rounded-lg px-4 py-2 font-medium ${
          filter === "completed"
            ? "bg-blue-600 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterButtons;