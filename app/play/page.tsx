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
                         font-semibold uppercase tracking-wide text-black
                         bg-[color:var(--gold)] hover:brightness-110 active:translate-y-[1px]
                         transition"
              aria-label="Join Discord"
            >
              <MessageCircle size={20} />
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