"use client";
import { useEffect, useState } from "react";

export default function TaskForm({ initial = {}, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState({ title: initial.title || "", description: initial.description || "" });

  const handle = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value }

	);
    
 

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.({ ...initial, ...form }); // keep _id
      }}
      className="card w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-1 md:col-span-1">
          <label className="sr-only">Title</label>
          <input
            name="title"
            placeholder="Title"
            className="input w-full"
            value={form.title}
            onChange={handle}
            required
          />
        </div>

        <div className="col-span-1 md:col-span-1">
          <label className="sr-only">Description</label>
          <textarea
            name="description"
            placeholder="Short description"
            className="input w-full resize-none h-24 md:h-full"
            value={form.description}
            onChange={handle}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button className="btn px-5 py-2">{submitLabel}</button>
      </div>
    </form>
  );
}
