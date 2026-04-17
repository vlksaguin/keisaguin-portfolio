import { FiGithub, FiLinkedin, FiMail, FiFileText } from "react-icons/fi";
import ProjCard from "@/components/ProjCard";
import { profile, projects } from "@/lib/site-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-teal-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-teal-900/20 blur-[120px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-4xl flex-col gap-24 px-6 pb-20 pt-32">
        <section id="hero" className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            {profile.name}
          </h1>
          <p className="mt-6 text-xl text-teal-400 font-medium">
            {profile.role}
          </p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-400">
            {profile.headline} Based in {profile.location}.
          </p>

          <div className="mt-10 flex items-center gap-6">
            <a href="https://github.com/vlksaguin/" className="text-slate-400 hover:text-white transition-colors"><FiGithub size={24} /></a>
            <a href="https://www.linkedin.com/in/kei-saguin/" className="text-slate-400 hover:text-white transition-colors"><FiLinkedin size={24} /></a>
            <a href="mailto:vl_saguin@dlsu.edu.ph,vlkcd.saguin.work@gmail.com" className="text-slate-400 hover:text-white transition-colors"><FiMail size={24} /></a>
            {/* <a href="#" className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-800 bg-slate-900/50 text-sm font-medium hover:bg-slate-800 transition-colors">
              <FiFileText size={18} /> Resume
            </a> */}
          </div>
        </section>

        <section id="projects" className="space-y-10">
          <div className="flex items-end justify-between border-b border-slate-900 pb-4">
            <h2 className="text-xl font-semibold text-white">Featured Work</h2>
            <a href="/projects" className="text-xs uppercase tracking-widest text-teal-600 hover:text-teal-400">View All</a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.slice(0, 4).map((project) => (
              <ProjCard
                key={project.id}
                title={project.title}
                description={project.summary}
                // imageUrl="/project-placeholder.svg"
                // imageAlt={project.title}
                stack={project.stack}
                href={project.href}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}