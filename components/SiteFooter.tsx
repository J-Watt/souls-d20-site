import { Mail, Heart } from "lucide-react";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Left side - Copyright info */}
          <div className="text-xs opacity-70 space-y-1">
            <p>Copyright 2023 by Timjan Kalajdzievski</p>
            <p>Art copyright 2023 by Kevin Bannister</p>
            <p>Site by Jordan Watt & Belmin Sestic</p>
          </div>

          {/* Right side - Social links and donate */}
          <div className="flex items-center gap-4">
            {/* Donate Button */}
            <a
              href="https://paypal.me/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md px-4 py-2
                         font-semibold text-sm uppercase tracking-wide text-black
                         bg-[color:var(--gold)] hover:brightness-110 active:translate-y-[1px]
                         transition"
              aria-label="Donate via PayPal"
            >
              <Heart size={16} />
              Donate
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Patreon */}
              <a
                href="https://www.patreon.com/SoulsD20"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                aria-label="Support on Patreon"
              >
                <Image
                  src="/images/icons/patreon-icon.png"
                  alt="Patreon"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </a>

              {/* Discord */}
              <a
                href="https://discord.gg/UnEKqTx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                aria-label="Join Discord"
              >
                <Image
                  src="/images/icons/discord-icon.png"
                  alt="Discord"
                  width={24}
                  height={24}
                  className="w-8 h-8 object-contain"
                />
              </a>

              {/* Email */}
              <a
                href="mailto:vgtimis133@gmail.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                aria-label="Send Email"
              >
                <Mail size={24} className="text-white/80" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}