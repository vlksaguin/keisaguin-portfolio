export const Footer = () => {
    return (
        <footer className="border-t border-white/10 bg-[linear-gradient(180deg,rgba(7,12,14,0.4),rgba(11,21,25,1))]">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
                <p>
                    &copy; {new Date().getFullYear()} Kei Saguin. All Rights Reserved
                </p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    Build. Ship. Learn.
                </p>
            </div>
        </footer>
    );
};

export default Footer;