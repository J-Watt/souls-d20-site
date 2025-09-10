import WorldMap from "@/components/WorldMap";

export const metadata = {
  title: "Map"
};

export default function MapPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">World Map</h1>
        <p className="opacity-80 text-sm sm:text-base">Click landmarks; pinch/scroll to explore.</p>
        <p className="text-white text-sm sm:text-base leading-relaxed max-w-3xl">
          In the shadowed expanse of <span className="text-[color:var(--gold)] font-bold">the Crucible Lands</span>, only <span className="text-[color:var(--gold)] font-bold">blood</span> and <span className="text-[color:var(--gold)] font-bold">souls</span> have drawn the maps you now hold. Venture forth, for beyond the edge of known realms lie secrets that have slain kings and driven wanderers mad.
        </p>
      </header>
      {/* WorldMap already sets its own height to 85vh */}
      <WorldMap />
    </div>
  );
}
