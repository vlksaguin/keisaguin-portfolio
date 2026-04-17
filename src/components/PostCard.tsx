import Link from "next/link";

interface PostCardProps {
	title: string;
	href: string;
	date: string;
}

const PostCard: React.FC<PostCardProps> = ({ title, href, date }) => {
	return (
		<li className="border-b border-white/10 py-2.5 last:border-b-0">
			<Link
				href={href}
				className="group flex items-center justify-between gap-3 text-sm text-slate-400 transition-colors hover:text-teal-300"
			>
				<span className="truncate">{title}</span>
				<span className="shrink-0 text-xs text-slate-500 group-hover:text-slate-300">{date}</span>
			</Link>
		</li>
	);
};

export default PostCard;
