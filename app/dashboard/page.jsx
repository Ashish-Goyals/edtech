"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import TaskForm from "../../components/TaskForm";
import TaskCard from "../../components/TaskCard";

export default function Dashboard() {
  const [resources, setResources] = useState([]);
  const [editing, setEditing] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/api/task");
      setResources(res.data || []);
    } catch (e) {
      console.error("Failed to load tasks", e);
      setResources([]);
    }
  };

  useEffect(() => {
    (async () => {
      await load();
      try {
        const me = await api.get('/api/auth/me');
        setCurrentUser(me.data?.user || null);
      } catch (e) {
        setCurrentUser(null);
      }
    })();
  }, []);

  const create = async (data) => {
    try {
      await api.post("/api/task", data);
      await load();
    } catch (e) {
      console.error("Create failed", e);
    }
  };

  const update = async (data) => {
    if (!data?._id) return;
    try {
      await api.put(`/api/task/${data._id}`, data);
      setEditing(null);
      await load();
    } catch (e) {
      console.error("Update failed", e);
    }
  };

  const del = async (id) => {
    try {
      await api.delete(`/api/task/${id}`);
      await load();
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4">Dashboard</h2>

      <div className="mb-6">
        <TaskForm key={"new"} submitLabel="Add Resource" onSubmit={create} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((r) => (
          <TaskCard
            key={r._id}
            task={r}
            onEdit={setEditing}
            onDelete={del}
            isAdmin={currentUser?.role === 'admin'}
          />
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl">
            <TaskForm
              key={editing._id}
              initial={editing}
              submitLabel="Update"
              onSubmit={update}
            />
            <div className="mt-2 text-right">
              <button
                className="btn bg-gray-300 text-black"
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
