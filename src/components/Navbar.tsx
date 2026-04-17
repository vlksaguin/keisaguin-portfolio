import Link from "next/link";

export const Navbar = () => {
    return (
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/90 backdrop-blur">
            <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-sm font-semibold tracking-[0.22em] text-slate-100">
                    KEI SAGUIN
                </Link>
                <ul className="flex items-center gap-5 text-sm text-slate-400">
                    <li>
                        <Link href="/projects" className="transition-colors hover:text-teal-300">Projects</Link>
                    </li>
                    <li>
                        <Link href="/blog" className="transition-colors hover:text-teal-300">Blog</Link>
                    </li>
                    <li>
                        <Link href="/" className="transition-colors hover:text-teal-300">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;