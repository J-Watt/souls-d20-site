"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MessageCircle } from "lucide-react";
import CampaignCarousel from "@/components/CampaignCarousel";
import DiscordWidget from "@/components/DiscordWidget";

// Campaign data
const campaigns = [
  {
    id: "frozen-warriors",
    name: "Frozen Warriors",
    title: "The Frozen Warriors Festival (one-shot session)",
    description: [
      "The city of Olafis sits in an arid land of tall mesas and rock spires. As a gateway between the desert empire of Erume and the rest of the continent of Archea, Olafis has long been a center of trade and travel. To celebrate this, a warriors festival is held: outsiders test their strength and styles against the best of the city.",
      "But Olafis now teeters on ruin. The frost dragon <strong>Acire</strong>, with thousands of northern soldiers, swept in and seized the city. Twisted into a symbol of oppression, the festival now disposes of prisoners and dissidents. You and your group are trapped in this torturous colosseum, seeking freedom or revenge."
    ],
    image: "/images/play/campaign1.jpg",
    alt: "Frozen Warriors campaign map"
  },
  {
    id: "tomb-prospectors", 
    name: "Tomb Prospectors",
    title: "Tales of the Tomb Prospectors (short campaign)",
    description: [
      "East of the kingdom of Yhelcain rises the beautiful city of Alvina: perpetual autumn, built into massive, golden-leaved trees. Alvina's guild of adventurers delves into the southern ruins of <strong>Lethrell</strong>, a civilization that fell generations ago to unspeakable horrors.",
      "The ruins hold powerful artifacts and magic: too valuable to ignore, too dangerous to leave. As Tomb Prospector initiates, your party ventures into catacombs and dungeons below. Return rich with twisted treasures… or be driven mad by what you witness."
    ],
    image: "/images/play/campaign2.jpg",
    alt: "Tomb Prospectors campaign map"
  },
  {
    id: "erume-privateers",
    name: "Erume Privateers", 
    title: "The Last Privateers of Erume (short campaign)",
    description: [
      "For a decade, the great western ocean of <strong>Sarda Cen</strong> has been closed. Fleets vanish without a single survivor. Amidst war with the north, one last ship secretly departs the golden capital of the Empire of Erume.",
      "Crewed by mercenaries and sailors mad (or brave) enough, your mission is to find a path to reopen the waters or turn the tide of war. Together you must sail cursed seas, cling to sanity, and uncover truths best left forgotten."
    ],
    image: "/images/play/campaign3.jpg",
    alt: "Erume Privateers campaign map"
  }
];

// Testimonials data
const testimonials = [
  {
    quote: "The Souls D20 system has been the perfect intro for a first-time TTRPG player. It has the depth to allow for incredible freedom and problem solving, as well as incredible stupidity, and I couldn't ask for anything more.",
    author: "Grant \"Showers\" Delhaes"
  },
  {
    quote: "What started off as a homebrew D&D system quickly turned into an official system that many can enjoy. The insane amount of TLC that went into this really shows. When starting, it can be a bit intimidating with the amount of detail, but once you get past that you'll see how incredible this is. I have played this for a couple years, and even though I lost count of how many characters I've gone through, there was never a dull moment creating my characters and playing the story. Dark Souls gameplay experience not required.",
    author: "Starr \"Dragonfly\" Melton"
  },
  {
    quote: "Tim has created not only a unique and amazing play system from the ground up: he's developed a whole world with rich history and mind-bending mysteries around every corner. As someone who enjoys the Dark Souls games and D&D, this is a beautiful fusion of the two. I love how strategic the play style is, how collaborative with other players, and the healing/AP/FP mechanics in combat. Character creation is wildly creative with races, backgrounds, weapons, and feats: seemingly infinite combinations. 10/10 recommend for anyone ready to delve too deep… and too greedily.",
    author: "50 drums"
  }
];

export default function PlayPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-16">
      
      {/* Hero Section */}
      <Reveal>
        <section className="panel text-center">
          <h1 className="text-[color:var(--gold)] text-4xl md:text-5xl font-semibold mb-6">
            Play Souls D20
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Join a game as a player now, or have a game run for you and a group of friends! 
            Join the Discord community to discuss the system and currently running games, or contact us directly at{" "}
            <a 
              href="mailto:vgtimis133@gmail.com" 
              className="text-[color:var(--gold)] hover:underline"
            >
              vgtimis133@gmail.com
            </a>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Contact actions">
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
            <a
              href="mailto:vgtimis133@gmail.com"
              className="inline-flex items-center justify-center gap-2 rounded-md px-6 py-3
                         font-semibold uppercase tracking-wide border-2 border-[color:var(--gold)]
                         text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black
                         active:translate-y-[1px] transition"
              aria-label="Email Us"
            >
              <Mail size={20} />
              Email Us
            </a>
          </div>
        </section>
      </Reveal>

      {/* Currently Running Campaigns */}
      <Reveal>
        <section>
          <div className="text-center mb-8">
            <h2 className="text-[color:var(--gold)] text-3xl md:text-4xl font-semibold mb-4">
              Currently Running Campaigns
            </h2>
            <p className="text-lg md:text-xl">
              Play alongside multiple other groups in a fully realized and living world crafted by the author of Souls D20.
            </p>
          </div>
          <CampaignCarousel campaigns={campaigns} />
        </section>
      </Reveal>


      {/* Testimonials */}
      <Reveal>
        <section>
          <h2 className="text-[color:var(--gold)] text-3xl md:text-4xl font-semibold text-center mb-8">
            What Players Are Saying
          </h2>
          <div className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <blockquote key={index} className="panel">
                <p className="text-lg leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
                <cite className="text-[color:var(--gold)] font-semibold">
                  - {testimonial.author}
                </cite>
              </blockquote>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Contact / Footer Callout */}
      <Reveal>
        <section className="panel">
          <h2 className="text-[color:var(--gold)] text-3xl md:text-4xl font-semibold mb-4">
            Join or Organize a Game
          </h2>
          <p className="text-lg md:text-xl mb-8 text-center">
            For sign-ups and pricing info, contact{" "}
            <a 
              href="mailto:vgtimis133@gmail.com" 
              className="text-[color:var(--gold)] hover:underline"
            >
              vgtimis133@gmail.com
            </a>{" "}
            or jump into our community.
          </p>
          <DiscordWidget />
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
