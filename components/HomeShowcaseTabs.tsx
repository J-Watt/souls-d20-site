"use client";

import Image from "next/image";
import { useState } from "react";
import SmallCarousel from "components/SmallCarousel";

type TabKey = "rulebook" | "combat" | "builds";

function cx(...cls: (string | false | undefined)[]) {
  return cls.filter(Boolean).join(" ");
}

export default function HomeShowcaseTabs() {
  const [active, setActive] = useState<TabKey>("rulebook");

  // Asset paths
  const rulebookCover = "/images/home/book-cover.jpg";
  const buildImage = "/images/home/builds.jpg";
  const combatImages = [
    "/images/home/combat-1.jpg",
    "/images/home/combat-2.jpg",
    "/images/home/combat-3.jpg",
  ];

  // Column sizing
  const leftColClass =
    active === "builds" ? "md:col-span-7" : "md:col-span-5";
  const rightColClass =
    active === "builds" ? "md:col-span-5" : "md:col-span-7";

  return (
    <section className="space-y-8">
      {/* Tabs */}
      <div className="flex items-center justify-center gap-8 md:gap-14">
        {(["rulebook", "combat", "builds"] as TabKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={cx(
              "pb-1 text-base md:text-lg uppercase tracking-wide",
              "text-[color:var(--gold)]/80 hover:text-[color:var(--gold)] transition",
              active === key &&
                "border-b-2 border-[color:var(--gold)] text-[color:var(--gold)]"
            )}
          >
            {key === "rulebook" ? "Rule Book" : key[0].toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Content row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
        {/* Image section */}
        <div className={cx("col-span-1", leftColClass)}>
          {active === "combat" ? (
            <SmallCarousel
              images={combatImages}
              className="rounded-lg overflow-hidden"
              rotateIntervalMs={2200}
              stopOnFirstClick
              aspectRatio="3/4"
            />
          ) : (
            <div className={cx(
              "relative w-full overflow-hidden rounded-lg",
              active === "rulebook" ? "aspect-[3/4]" : "aspect-[4/3]"
            )}>
              <Image
                src={active === "rulebook" ? rulebookCover : buildImage}
                alt={active === "rulebook" ? "Book Cover" : "Builds"}
                fill
                sizes="(min-width: 1280px) 40vw, (min-width: 768px) 60vw, 100vw"
                className="object-contain w-full h-full"
                priority={active === "rulebook"}
              />
            </div>
          )}
        </div>

        {/* Text section */}
        <div className={cx(
          "col-span-1 space-y-4 flex flex-col justify-center items-center text-center h-full",
          rightColClass
        )}>
          {active === "rulebook" && (
            <>
              <h2 className="text-[color:var(--gold)] font-semibold text-2xl md:text-3xl">
                A full-system table-top role-playing experience
              </h2>
              <p className="opacity-90 text-base md:text-lg">
                A comprehensive and rules-heavy system that can be picked up easily by beginners
                and experienced players alike.
              </p>
              <a
                href="/book"
                className="inline-flex items-center justify-center rounded-md px-8 py-4
                           font-semibold uppercase tracking-wide text-black
                           bg-[#F3C94E] hover:brightness-105 active:translate-y-[1px]
                           transition mt-2"
              >
                VIEW BOOK
              </a>
            </>
          )}

          {active === "combat" && (
            <>
              <h2 className="text-[color:var(--gold)] font-semibold text-2xl md:text-3xl">
                A combat style which encourages learning and countering adversaries
              </h2>
              <p className="opacity-90 text-base md:text-lg">
                Learn enemy behavior over the course of fights to dodge attacks and counter with
                your own skills: depth that rewards mastery.
              </p>
              <a
                href="/info"
                className="inline-flex items-center justify-center rounded-md px-8 py-4
                           font-semibold uppercase tracking-wide text-black
                           bg-[#F3C94E] hover:brightness-105 active:translate-y-[1px]
                           transition mt-2"
              >
                MORE INFO
              </a>
            </>
          )}

          {active === "builds" && (
            <>
              <h2 className="text-[color:var(--gold)] font-semibold text-2xl md:text-3xl">
                Build characters into a unique class of your own making
              </h2>
              <p className="opacity-90 text-base md:text-lg">
                Craft a unique class from versatile weapon proficiency trees. Mix and synergize
                abilities as you level to shape your own playstyle.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
