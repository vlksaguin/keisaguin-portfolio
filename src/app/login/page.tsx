"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      setError("Invalid credentials. Use Kei / password.");
      return;
    }

    const data = (await response.json()) as { token: string };
    localStorage.setItem("blogAuthToken", data.token);
    router.push("/blog/manage");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 text-slate-200">
      <form onSubmit={onSubmit} className="w-full space-y-4 rounded border border-white/10 p-6">
        <h1 className="text-xl font-semibold text-white">Login</h1>
        <p className="text-sm text-slate-400">Use Kei / password</p>

        <input
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          className="w-full rounded border border-white/15 bg-slate-900 px-3 py-2"
        />

        <input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          type="password"
          className="w-full rounded border border-white/15 bg-slate-900 px-3 py-2"
        />

        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        <button type="submit" className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-500">
          Login
        </button>
      </form>
    </main>
  );
}
