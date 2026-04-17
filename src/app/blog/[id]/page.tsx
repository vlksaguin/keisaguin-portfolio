"use client";

import { useEffect, useState } from "react";

interface BlogPost {
	id: number;
	title: string;
	body: string;
}

interface BlogPostPageProps {
	params: Promise<{
		id: string;
	}>;
}

function BlogPostPage({ params }: BlogPostPageProps) {
	const [post, setPost] = useState<BlogPost | null>(null);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		async function loadPost() {
			const { id } = await params;
			const response = await fetch(`/api/blog/${id}`, { cache: "no-store" });

			if (!response.ok) {
				setError("Post not found.");
				return;
			}

			const data = (await response.json()) as BlogPost;
			setPost(data);
		}

		loadPost();
	}, [params]);

	if (error) {
		return <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pt-24 text-slate-200">{error}</main>;
	}

	if (!post) {
		return <main className="mx-auto min-h-screen w-full max-w-3xl px-6 pt-24 text-slate-200">Loading...</main>;
	}

	return (
		<main className="mx-auto min-h-screen w-full max-w-3xl px-6 pt-24 text-slate-200">
			<h1 className="text-3xl font-semibold text-white">{post.title}</h1>
			<p className="mt-4 text-slate-300">{post.body}</p>
		</main>
	);
}

export default BlogPostPage;
