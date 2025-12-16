'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/login', form, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // if you are using cookies for JWT
      });

      if (res.status === 200) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      if (err.response) {
        // Server responded with status code out of 2xx range
        setError(err.response.data.message || 'Invalid email or password');
      } else if (err.request) {
        // Request made but no response
        setError('No response from server. Please try again later.');
      } else {
        // Something else
        setError('Something went wrong. Please try again.');
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-xl mb-4 font-bold">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input mt-2"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="btn mt-4 w-full"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
