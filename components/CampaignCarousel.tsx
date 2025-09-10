"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type Campaign = {
  id: string;
  name: string;
  title: string;
  description: string[];
  image: string;
  alt: string;
};

type Props = {
  campaigns: Campaign[];
  autoRotateMs?: number;
  className?: string;
};

export default function CampaignCarousel({ 
  campaigns, 
  autoRotateMs = 12000, 
  className = "" 
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);


  if (campaigns.length === 0) return null;

  const currentCampaign = campaigns[currentIndex];

  return (
    <div className={`relative ${className}`}>
      {/* Campaign Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {campaigns.map((campaign, index) => (
          <button
            key={campaign.id}
            onClick={() => setCurrentIndex(index)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              index === currentIndex
                ? "bg-[color:var(--gold)] text-black"
                : "bg-transparent border border-[color:var(--gold)] text-[color:var(--gold)] hover:bg-[color:var(--gold)]/10"
            }`}
          >
            {campaign.name}
          </button>
        ))}
      </div>

      {/* Campaign Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* World Map Image */}
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
          <Image
            src={currentCampaign.image}
            alt={currentCampaign.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain transition-opacity duration-500"
          />
        </div>

        {/* Text Content */}
        <div className="panel">
          <h3 className="text-[color:var(--gold)] text-2xl font-semibold mb-2">
            {currentCampaign.name}
          </h3>
          <h4 className="text-xl font-medium mb-4">
            {currentCampaign.title}
          </h4>
          {currentCampaign.description.map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0" dangerouslySetInnerHTML={{ __html: paragraph }} />
          ))}
        </div>
      </div>

    </div>
  );
}