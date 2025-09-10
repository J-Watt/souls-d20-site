import Link from "next/link";

export default function CTAPlayCard() {
  return (
    <div className="bg-gradient-to-br from-theme-surface/70 to-black/20 rounded-2xl p-6 md:p-8 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold mb-2">Ready to adventure?</h2>
        <p className="opacity-80">Spin up a session in minutes. Join our Discord, grab a module, and roll!</p>
      </div>
      <div className="flex gap-3">
        <Link href="/play" className="px-4 py-2 rounded-xl bg-theme-accent/20 hover:bg-theme-accent/30">Play Now</Link>
        <a href="https://discord.com/invite/yourserver" className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5">Join Discord</a>
      </div>
    </div>
  );
}
