"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  body: string;
}

export default function Blogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch("/api/blog", { cache: "no-store" });
      if (response.ok) {
        const data = (await response.json()) as BlogPost[];
        setPosts(data);
      }
      setLoading(false);
    }

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      {/* Deep Dark Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-teal-950/20 blur-[160px]" />
      </div>
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-20 pt-24 text-slate-200">
        
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">Blog</h1>
        <div className="flex gap-3 text-sm">
          <Link href="/login" className="text-teal-300 hover:text-teal-200">Login</Link>
          <Link href="/blog/manage" className="text-teal-300 hover:text-teal-200">Manage</Link>
        </div>
      </div>

      {loading ? <p>Loading...</p> : null}

      {!loading && posts.length === 0 ? <p>No posts yet.</p> : null}

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`} className="block rounded border border-white/10 p-4 hover:border-teal-300/40">
              <p className="font-medium text-white">{post.title}</p>
              <p className="mt-1 text-sm text-slate-400">{post.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  </div>
  );
}