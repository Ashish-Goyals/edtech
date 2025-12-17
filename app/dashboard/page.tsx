"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import TaskForm, { TaskFormData } from "@/components/TaskForm";
import TaskCard, { Task } from "@/components/TaskCard";

interface User {
  _id: string;
  role: "user" | "admin";
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editing, setEditing] = useState<Task | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  /* 🔄 Load tasks */
  const loadTasks = async () => {
    try {
      const res = await api.get<Task[]>("/api/task");

      // normalize _id
      const normalized = res.data.map((t) => ({
        ...t,
        _id: String(t._id),
      }));

      setTasks(normalized);
    } catch {
      setTasks([]);
    }
  };

  /* 🔄 Load user + tasks */
  useEffect(() => {
    (async () => {
      await loadTasks();
      try {
        const me = await api.get<{ user: User | null }>("/api/auth/me");
        setCurrentUser(me.data?.user ?? null);
      } catch {
        setCurrentUser(null);
      }
    })();
  }, []);

  /* ➕ Create */
  const createTask = async (data: TaskFormData) => {
    await api.post("/api/task", data);
    await loadTasks();
  };

  /* ✏️ Update (FIXED) */
  const updateTask = async (data: TaskFormData) => {
    if (!data._id) return; // ✅ required

    await api.put(`/api/task/${data._id}`, data);
    setEditing(null);
    await loadTasks();
  };

  /* 🗑 Delete */
  const deleteTask = async (id: string) => {
    await api.delete(`/api/task/${id}`);
    await loadTasks();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Dashboard</h2>

      {/* Create */}
      <TaskForm submitLabel="Add Task" onSubmit={createTask} />

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={setEditing}
            onDelete={deleteTask}
            isAdmin={currentUser?.role === "admin"}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white p-4 rounded max-w-xl w-full">
            <TaskForm
              initial={editing}
              submitLabel="Update"
              onSubmit={updateTask} // ✅ FIXED
            />

            <div className="text-right mt-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
