export default function Testimonials() {
  const items = [
    { name: "Aria", text: "Combat is crunchy and cinematic. Our table was hooked." },
    { name: "Dax", text: "The map interactions are slick on mobile!" },
    { name: "Rowan", text: "Flipbook feels like a real tome. Love the vibe." }
  ];
  return (
    <div className="bg-theme-surface/60 rounded-2xl p-6 shadow-soft">
      <h2 className="text-2xl font-semibold mb-4">Player Comments</h2>
      <ul className="grid md:grid-cols-3 gap-4">
        {items.map((i, idx) => (
          <li key={idx} className="bg-black/30 rounded-xl p-4">
            <p className="opacity-90">“{i.text}”</p>
            <p className="text-sm opacity-60 mt-2">- {i.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
