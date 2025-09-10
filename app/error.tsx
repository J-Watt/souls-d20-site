"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-8">
        <Image
          src="/images/logos/SoulsD20 Title Color.png"
          alt="Souls D20"
          width={600}
          height={180}
          priority
          className="mx-auto max-w-lg w-full h-auto"
        />
        
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold text-[color:var(--gold)]">
            Something Went Wrong
          </h1>
          <p className="text-lg opacity-80">
            An unexpected error occurred.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-md px-8 py-4
                       font-semibold uppercase tracking-wide text-black
                       bg-[color:var(--gold)] hover:brightness-110 active:translate-y-[1px]
                       transition"
          >
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md px-8 py-4
                       font-semibold uppercase tracking-wide border-2 border-[color:var(--gold)]
                       text-[color:var(--gold)] hover:bg-[color:var(--gold)] hover:text-black
                       active:translate-y-[1px] transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}