"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import InfoCarousel from "@/components/InfoCarousel";


// Carousel data for Creative Builds section
const buildsSlides = [
  {
    text: `<h3 class="text-[color:var(--gold)] text-xl mb-4">Scholar of All Magic</h3>
           <p>Master the art of sound and song to weave the essence of every magical school, Pyromancy, Miracles, Sorcery, Hexes, into a symphony of power. With the right instrument in hand, the world bends to your melody, conjuring firestorms, healing light, destructive spells, and curses all at once.</p>`,
    image: "/images/info/image5.jpg",
    alt: "Scholar of All Magic build"
  },
  {
    text: `<h3 class="text-[color:var(--gold)] text-xl mb-4">Blood Monk</h3>
           <p>Go down the <em>Fist</em> and <em>Reaper</em> trees to create a monk-like character who deals extra bleed build-up at the cost of their own blood or a martial artist who protects their allies while draining enemies.</p>`,
    image: "/images/info/image6.jpg",
    alt: "Blood monk build"
  },
  {
    text: `<h3 class="text-[color:var(--gold)] text-xl mb-4">Tanky Gunslinger</h3>
           <p>Try out a <em>tanky gunslinger</em> who defends with a shield while taking precise shots with a firearm, combining defense and ranged mastery.</p>`,
    image: "/images/info/image7.jpg",
    alt: "Tanky gunslinger build"
  }
];

export default function InfoPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-16">
      
      {/* Hero intro */}
      <Reveal>
        <section className="panel relative overflow-hidden">
          {/* Watermark logo */}
          <div className="absolute inset-0 opacity-5 flex items-center justify-center">
            <Image
              src="/images/logos/SoulsD20 LOGO Color.png"
              alt=""
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-[color:var(--gold)] font-['Mantinia'] text-4xl md:text-5xl mb-6">
              A Complete System
            </h1>
            <p className="text-lg md:text-xl leading-relaxed">
              Souls D20 is a full-system tabletop roleplaying experience inspired by the Elden Ring 
              and Soulsborne games. With strategic combat and highly customizable character builds, 
              Souls D20 can be played in person or online using the Handbook for a complete ruleset 
              as well as resources.
            </p>
          </div>
        </section>
      </Reveal>

      {/* System preview section */}
      <Reveal>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="panel">
            <h2 className="text-[color:var(--gold)] text-2xl md:text-3xl font-semibold mb-4">
              Check Out the System Preview!
            </h2>
            <p className="mb-4">
              Take a peek inside the system with the available preview. Souls D20 is regularly updated 
              and playtested. To get the latest full version, please check out our Discord and get in contact.
            </p>
            <h3 className="text-[color:var(--gold)] text-xl font-semibold mb-3">
              320+ Pages of Content
            </h3>
            <p className="mb-4">
              The complete Souls D20 book includes over 320 pages of resources, such as spell lists, 
              equipment and weapons lists, skill and ability trees, and quick guides for leveling and 
              building a character.
            </p>
            <p className="mb-6">
              Everything you need to run engaging campaigns with detailed equipment, comprehensive 
              spell systems, and balanced encounter guidelines. Souls D20 is regularly updated 
              and playtested. Get the latest full version through our Discord community.
            </p>
            <a
              href="https://discord.gg/UnEKqTx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3
                         font-semibold uppercase tracking-wide text-white
                         bg-[#5865F2] hover:bg-[#4752C4] active:translate-y-[1px]
                         transition"
              aria-label="Join Discord"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.174.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
              </svg>
              Join Discord
            </a>
          </div>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/images/info/image1.jpg"
              alt="System preview and book content"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </section>
      </Reveal>

      {/* Character builds section */}
      <Reveal>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/images/info/image2.jpg"
              alt="Character build trees"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
          <div className="panel">
            <h2 className="text-[color:var(--gold)] text-2xl md:text-3xl font-semibold mb-4">
              Customized Builds
            </h2>
            <p className="mb-4">
              23 unique ability trees allow you to mix and match abilities and synergies to create 
              endless possibilities for your character builds.
            </p>
            <p className="mb-4">
              As you gain experience through adventuring, your character will earn points to invest into 
              multiple ability trees at once. Mix and match abilities from different trees to create a 
              unique character. Most abilities can be combined with most weapon types!
            </p>
            <p className="mb-4">
              For example, a character who has invested into the <strong>Daggers tree</strong> to deal 
              more damage from behind can still take advantage of that ability even while wielding 
              a non-dagger weapon.
            </p>
            <p>
              Choose from dozens of <strong>Feats of Destiny</strong>, which can be taken at any level 
              by any character. These include becoming truly undead and taking permanent injuries instead 
              of dying, learning new languages to communicate with monsters, or binding a magical familiar 
              under your control.
            </p>
          </div>
        </section>
      </Reveal>

      {/* Spells section */}
      <Reveal>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="panel">
            <h2 className="text-[color:var(--gold)] text-2xl md:text-3xl font-semibold mb-4">
              Wide Range Of Spells
            </h2>
            <p className="mb-4">
              Explore multiple categories of magic and spellcasting to build a caster or spellblade 
              of your own! Choose from <strong>Sorceries</strong>, <strong>Miracles</strong>, 
              <strong>Pyromancy</strong>, <strong>Hexes</strong>, and even 
              <strong>Spirit Summoning</strong>, each with subcategories and ability trees to progress down.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] mt-2 mr-3 flex-shrink-0"></span>
                <span><em>Hexes of death</em> - explode corpses or create toxic fogs across the battlefield.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] mt-2 mr-3 flex-shrink-0"></span>
                <span><em>Force miracles</em> - push enemies and allies into advantageous positions.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] mt-2 mr-3 flex-shrink-0"></span>
                <span><em>Assassin sorceries</em> - cloak yourself in transparency and summon daggers to strike from behind.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] mt-2 mr-3 flex-shrink-0"></span>
                <span><em>Spirit summoning</em> - capture defeated monsters and call them back to fight at your side.</span>
              </li>
            </ul>
          </div>
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/images/info/image3.jpg"
              alt="Magic spells showcase"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </section>
      </Reveal>

      {/* Weapon skills section */}
      <Reveal>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
            <Image
              src="/images/info/image4.jpg"
              alt="Weapon skills demonstration"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
          <div className="panel">
            <h2 className="text-[color:var(--gold)] text-2xl md:text-3xl font-semibold mb-4">
              Master Weapon Skills
            </h2>
            <p className="mb-4">
              Don't let spellcasters have all the fun! Learn and master an array of weapon skills that 
              can be mixed and matched across a wide variety of weapons.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] mt-2 mr-3 flex-shrink-0"></span>
                <span>Augment your attacks with area effects to strike multiple targets at once.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] mt-2 mr-3 flex-shrink-0"></span>
                <span>Inspire and buff your allies with weapon-based support skills.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] mt-2 mr-3 flex-shrink-0"></span>
                <span>Create blades of air with your strikes, pull in enemies with gravity, or vault across the battlefield.</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 rounded-full bg-[color:var(--gold)] mt-2 mr-3 flex-shrink-0"></span>
                <span>Summon a phantom copy of yourself to strike unreachable foes.</span>
              </li>
            </ul>
          </div>
        </section>
      </Reveal>
      
      {/* Creative builds carousel */}
      <Reveal>
        <section>
          <h2 className="text-[color:var(--gold)] text-2xl md:text-3xl font-semibold text-center mb-8">
            Creative Builds in Action
          </h2>
          <InfoCarousel slides={buildsSlides} />
        </section>
      </Reveal>

      {/* Final CTA */}
      <Reveal>
        <section className="panel relative overflow-hidden text-center">
          {/* Logo watermark */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <Image
              src="/images/logos/SoulsD20 Title Color.png"
              alt=""
              width={600}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-[color:var(--gold)] text-3xl md:text-4xl font-semibold mb-6">
              Explore the Full Souls D20 System
            </h2>
            <p className="text-lg mb-8">
              Souls D20 is a living, evolving system designed for deep roleplay and challenging combat. 
              Join the community, build your character, and test your skills against the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/play"
                className="inline-flex items-center justify-center rounded-md px-8 py-4
                           font-semibold uppercase tracking-wide text-black
                           bg-[color:var(--gold)] hover:brightness-110 active:translate-y-[1px]
                           transition"
              >
                Play Now
              </a>
              <a
                href="https://discord.gg/UnEKqTx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md px-8 py-4
                           font-semibold uppercase tracking-wide text-white
                           bg-[#5865F2] hover:bg-[#4752C4] active:translate-y-[1px]
                           transition"
                aria-label="Join Discord"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.174.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
                </svg>
                Join Discord
              </a>
            </div>
          </div>
        </section>
      </Reveal>

    </div>
  );
}

// Animation component with fade-in on scroll
function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  
  return (
    <motion.div 
      ref={ref} 
      initial={{ opacity: 0, y: 30 }} 
      animate={inView ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}