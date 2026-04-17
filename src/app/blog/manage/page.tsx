"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  body: string;
}

export default function ManageBlogPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("blogAuthToken") ?? "";
    if (!savedToken) {
      router.push("/login");
      return;
    }

    setToken(savedToken);
    void loadPosts();
  }, [router]);

  async function loadPosts() {
    const response = await fetch("/api/blog", { cache: "no-store" });
    if (!response.ok) {
      return;
    }

    const data = (await response.json()) as BlogPost[];
    setPosts(data);
  }

  async function savePost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
    const method = editingId ? "PATCH" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-admin-auth": token,
      },
      body: JSON.stringify({ title, body }),
    });

    if (!response.ok) {
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? "Request failed");
      return;
    }

    setTitle("");
    setBody("");
    setEditingId(null);
    setMessage(editingId ? "Post updated" : "Post created");
    await loadPosts();
  }

  async function removePost(id: number) {
    const response = await fetch(`/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        "x-admin-auth": token,
      },
    });

    if (!response.ok) {
      const data = (await response.json()) as { message?: string };
      setMessage(data.message ?? "Delete failed");
      return;
    }

    setMessage("Post deleted");
    await loadPosts();
  }

  function startEdit(post: BlogPost) {
    setEditingId(post.id);
    setTitle(post.title);
    setBody(post.body);
    setMessage("");
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pb-20 pt-24 text-slate-200">
      <h1 className="text-2xl font-semibold text-white">Manage Blog</h1>

      <form onSubmit={savePost} className="mt-6 space-y-3 rounded border border-white/10 p-4">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title (max 20 chars)"
          maxLength={20}
          className="w-full rounded border border-white/15 bg-slate-900 px-3 py-2"
        />

        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Body (max 256 chars)"
          maxLength={256}
          className="w-full rounded border border-white/15 bg-slate-900 px-3 py-2"
        />

        <div className="flex gap-2">
          <button type="submit" className="rounded bg-teal-600 px-4 py-2 text-white hover:bg-teal-500">
            {editingId ? "Update" : "Create"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setTitle("");
                setBody("");
              }}
              className="rounded border border-white/20 px-4 py-2"
            >
              Cancel
            </button>
          ) : null}
        </div>

        {message ? <p className="text-sm text-slate-300">{message}</p> : null}
      </form>

      <ul className="mt-6 space-y-3">
        {posts.map((post) => (
          <li key={post.id} className="rounded border border-white/10 p-4">
            <p className="font-medium text-white">{post.title}</p>
            <p className="text-sm text-slate-400">{post.body}</p>
            <div className="mt-3 flex gap-2 text-sm">
              <button onClick={() => startEdit(post)} className="rounded border border-white/20 px-3 py-1">
                Edit
              </button>
              <button onClick={() => removePost(post.id)} className="rounded border border-rose-300/40 px-3 py-1 text-rose-300">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
