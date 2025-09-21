import Image from "next/image";
import HomeShowcaseTabs from "../components/HomeShowcaseTabs";

// No metadata export needed - will use default "Souls D20" from layout

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
      {/* Main logo */}
      <div className="flex items-center justify-center">
        <Image
          src="/images/logos/SoulsD20 Title Color.png"
          alt="Souls D20"
          width={1200}
          height={360}
          priority
          className="w-full max-w-3xl h-auto"
        />
      </div>

      <HomeShowcaseTabs />

      {/* Final CTA section */}
      <section className="text-center space-y-6">
        <h2
          className="text-[color:var(--gold)] font-semibold text-2xl md:text-3xl leading-snug"
          style={{ textWrap: "balance" as any }}
        >
          Start your adventure now, and play in a living
          <br className="hidden md:block" />
          world six years in the making.
        </h2>

        <p className="max-w-3xl mx-auto opacity-90 text-base md:text-lg">
          Play in a team, alongside multiple other teams of players and game masters,
          where your actions change the world and their experiences.
        </p>

        <a
          href="/play"
          className="inline-flex items-center justify-center rounded-md px-8 py-4
                    font-semibold uppercase tracking-wide text-black
                    bg-[#F3C94E] hover:brightness-105 active:translate-y-[1px]
                    transition"
        >
          PLAY
        </a>
      </section>
    </main>
  );
}
