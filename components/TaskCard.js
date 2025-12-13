export default function TaskCard({task, onEdit, onDelete, isAdmin}) {
  return (
    <article className="group relative w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
        {task.title}
      </h3>

      {/* Description */}
      {task.description &&
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {task.description}
        </p>}

      {/* Actions */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          onClick={() => onEdit (task)}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          Edit
        </button>

        {isAdmin &&
          <button
            onClick={() => onDelete (task._id)}
            className="inline-flex items-center justify-center rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
          >
            Delete
          </button>}
      </div>
    </article>
  );
}
