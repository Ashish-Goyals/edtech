'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Login () {
  const [form, setForm] = useState ({email: '', password: ''});
  const router = useRouter ();

  const submit = async e => {
    e.preventDefault ();

    const res = await fetch ('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify (form),
    });

    if (res.ok) router.push ('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-xl mb-4 font-bold">Login</h2>

        <input
          placeholder="Email"
          className="input"
          onChange={e => setForm ({...form, email: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="input mt-2"
          onChange={e => setForm ({...form, password: e.target.value})}
        />

        <button className="btn mt-4">Login</button>
      </form>
    </div>
  );
}
