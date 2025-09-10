type Props = { id: string; title: string; summary: string; img: string; };

export default function ModuleCard({ title, summary, img }: Props) {
  return (
    <article className="rounded-2xl overflow-hidden bg-theme-surface/60 shadow-soft flex flex-col">
      <div className="aspect-video bg-black/40">
        <img src={img} alt={title} className="w-full h-full object-cover opacity-90" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="opacity-80 text-sm mt-1 mb-4">{summary}</p>
        <div className="mt-auto">
          <button className="px-3 py-1.5 rounded-xl bg-theme-accent/20 hover:bg-theme-accent/30">View</button>
        </div>
      </div>
    </article>
  );
}
