'use client';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function Register () {
  const [form, setForm] = useState ({
    name: '',
    email: '',
    password: '',
  });

  const router = useRouter ();

  const submit = async e => {
    e.preventDefault ();

    const res = await fetch ('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify (form),
    });

    if (res.ok) router.push ('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded w-80 shadow" onSubmit={submit}>
        <h2 className="text-xl mb-4 font-bold">Register</h2>

        <input
          placeholder="Name"
          className="input"
          onChange={e => setForm ({...form, name: e.target.value})}
        />

        <input
          placeholder="Email"
          className="input mt-2"
          onChange={e => setForm ({...form, email: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="input mt-2"
          onChange={e => setForm ({...form, password: e.target.value})}
        />

        <button className="btn mt-4">Register</button>
      </form>
    </div>
  );
}
