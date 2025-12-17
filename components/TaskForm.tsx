"use client";

import { useState } from "react";


export interface TaskFormData {
  _id?: string;          // optional for edit
  title: string;
  description?: string;
}


interface TaskFormProps {
  initial?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  submitLabel?: string;
}

export default function TaskForm({
  initial = {},
  onSubmit,
  submitLabel = "Save",
}: TaskFormProps) {
  const [form, setForm] = useState<TaskFormData>({
    title: initial.title ?? "",
    description: initial.description ?? "",
  });

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit({
      ...initial,
      ...form,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          name="title"
          placeholder="Title"
          className="input w-full"
          value={form.title}
          onChange={handle}
          required
        />

        <textarea
          name="description"
          placeholder="Short description"
          className="input w-full resize-none h-24 md:h-full"
          value={form.description}
          onChange={handle}
        />
      </div>

      <div className="mt-3 flex justify-end">
        <button type="submit" className="btn px-5 py-2">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
