import Flipbook from "@/components/Flipbook";

export const metadata = {
  title: "Book"
};

export default function BookPage() {
  return (
    <div className="mx-auto w-full px-2 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      <header className="space-y-1 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Rulebook Preview</h1>
        <p className="opacity-80 text-sm sm:text-base">
          Full PDF available{" "}
          <a
            className="underline"
            href="/book/Souls_D20_Book.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>.
        </p>
      </header>

      <div
          className="bg-theme-surface/60 rounded-2xl p-2 sm:p-4 shadow-soft flex items-center justify-center"
          style={{ minHeight: "90vh" }}
      >
        <Flipbook />
      </div>
    </div>
  );
}
