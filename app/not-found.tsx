import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
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
            Page Not Found
          </h1>
          <p className="text-lg opacity-80">
            The page you're looking for doesn't exist.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md px-8 py-4
                     font-semibold uppercase tracking-wide text-black
                     bg-[color:var(--gold)] hover:brightness-110 active:translate-y-[1px]
                     transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}