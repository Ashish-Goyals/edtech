"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SimpleNavbar() {
	const [user, setUser] = useState(null);
	const router = useRouter();

	useEffect(() => {
		let mounted = true;
		axios
			.get('/api/auth/me')
			.then((res) => {
				if (mounted) setUser(res.data?.user || null);
			})
			.catch(() => {
				if (mounted) setUser(null);
			});

		return () => {
			mounted = false;
		};
	}, []);

	const logout = async () => {
		try {
			await axios.post('/api/auth/logout');
			setUser(null);
			router.push('/login');
		} catch (e) {
			console.error('Logout failed', e);
		}
	};

	return (
		<header className="w-full border-b">
			<div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
				<div className="flex items-center">
					<Link href="/" className="text-lg font-semibold">EdTech</Link>
				</div>

				<nav className="flex flex-wrap items-center gap-3">
					<Link href="/dashboard" className="text-sm">Dashboard</Link>
					{user ? (
						<button onClick={logout} className="text-sm">Logout</button>
					) : (
						<>
							<Link href="/login" className="text-sm">Login</Link>
							<Link href="/register" className="text-sm">Register</Link>
						</>
					)}
				</nav>
			</div>
		</header>
	);
}

