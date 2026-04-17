import React from 'react';
import Link from 'next/link';

interface ProjCardProps {
    title: string;
    description: string;
    // imageUrl: string;
    // imageAlt: string;
    stack: string[];
    href: string;
}

const ProjCard: React.FC<ProjCardProps> = ({
    title,
    description,
    // status,
    stack,
    href
}) => {
    return (
        <Link href={href} className="group block">
            <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/55 shadow-[0_12px_36px_-24px_rgba(11,148,148,0.35)] transition hover:-translate-y-0.5 hover:border-teal-300/25">
                {/* <div className="aspect-[16/10] overflow-hidden bg-slate-800">
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                />
            </div> */}
                <div className="space-y-4 p-5">
                    <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold text-slate-50">{title}</h3>
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{description}</p>
                    <div className="flex flex-wrap gap-2">
                        {stack.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-teal-300/15 bg-teal-400/10 px-2.5 py-1 text-xs text-teal-100"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default ProjCard;