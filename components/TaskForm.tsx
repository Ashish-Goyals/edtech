"use client";

import { useState } from "react";
import { ITask } from '../lib/models/Task';

/* 🔹 Props type */
interface TaskFormProps {
  initial?: Partial<ITask>;
  onSubmit?: (task: ITask) => void;
  submitLabel?: string;
}

export default function TaskForm({
  initial = {},
  onSubmit,
  submitLabel = "Save",
}: TaskFormProps): JSX.Element {
  const [form, setForm] = useState<ITask>({
    title: initial.title ?? "",
    description: initial.description ?? "",
  });

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit?.({ ...initial, ...form });
  };

  return (
    <form onSubmit={handleSubmit} className="card w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="col-span-1">
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

        <div className="col-span-1">
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
        <button type="submit" className="btn px-5 py-2">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
