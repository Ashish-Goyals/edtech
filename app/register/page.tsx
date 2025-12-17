'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded w-80 shadow" onSubmit={submit}>
        <h2 className="text-xl mb-4 font-bold">Register</h2>

        <input
          name="name"
          placeholder="Name"
          className="input"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="input mt-2"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input mt-2"
          value={form.password}
          onChange={handleChange}
        />

        <button type="submit" className="btn mt-4">
          Register
        </button>
      </form>
    </div>
  );
}
