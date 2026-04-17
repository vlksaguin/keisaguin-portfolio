export default function Projects() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300">
      {/* Deep Dark Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-teal-950/20 blur-[160px]" />
      </div>

      <main className="relative mx-auto w-full max-w-4xl px-6 pb-20 pt-32">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white">Archive</h1>
          <p className="max-w-xl text-lg text-slate-400">
            A comprehensive list of things I’ve built or contributed to. 
            Currently undergoing a redesign for a cleaner experience.
          </p>
          
          <div className="pt-12">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-teal-900/50 bg-teal-950/20 text-xs font-mono text-teal-500 uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              Under Construction
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}