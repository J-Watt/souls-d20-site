"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker with fallback
function setPdfWorkerForCore() {
  const ver = (pdfjs as any).version || "latest";
  const mjs = `https://unpkg.com/pdfjs-dist@${ver}/build/pdf.worker.min.mjs`;
  const js  = `https://unpkg.com/pdfjs-dist@${ver}/build/pdf.worker.min.js`;
  pdfjs.GlobalWorkerOptions.workerSrc = mjs;
  if (typeof window !== "undefined") {
    fetch(mjs, { method: "HEAD" })
      .then(r => { if (!r.ok) throw new Error(); })
      .catch(() => { pdfjs.GlobalWorkerOptions.workerSrc = js; });
  }
}
setPdfWorkerForCore();

// Book layout constants
const SPREAD_BREAKPOINT = 900;
const OUTER_PADDING = 16;
const FALLBACK_ASPECT = 1.414;

export default function PdfFlipClient() {
  const [numPages, setNumPages] = useState(0);
  const [pagesLoaded, setPagesLoaded] = useState(0);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [containerW, setContainerW] = useState(800);
  const [containerH, setContainerH] = useState(600);
  const [aspect, setAspect] = useState(FALLBACK_ASPECT);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setContainerW(Math.max(320, Math.floor(width)));
      setContainerH(Math.max(420, Math.floor(height)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/book/Souls_D20_Book.pdf", { cache: "force-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = await res.arrayBuffer();
        if (!cancelled) setPdfData(buf);
      } catch (e: any) {
        if (!cancelled) setError(`Failed to load PDF: ${e?.message ?? "unknown error"}`);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const fileSpec = useMemo(() => (pdfData ? { data: pdfData } : null), [pdfData]);
  // Skip first page (cover) - start from page 2
  const pages = useMemo(() => Array.from({ length: Math.max(0, numPages - 1) || 1 }, (_, i) => i + 2), [numPages]);

  const isLandscape = containerW > containerH;
  const isSpread = isLandscape || containerW >= SPREAD_BREAKPOINT;

  const availW = Math.max(0, containerW - OUTER_PADDING * 2);
  const availH = Math.max(0, containerH - OUTER_PADDING * 2);

  const pageWidthLimitByW = isSpread ? Math.floor(availW / 2) : availW;
  const pageWidthLimitByH = Math.floor(availH / aspect);
  const pageWidth = Math.max(320, Math.min(pageWidthLimitByW, pageWidthLimitByH));
  const pageHeight = Math.floor(pageWidth * aspect);

  const bookWidth = isSpread ? pageWidth * 2 : pageWidth;
  const bookHeight = pageHeight;

  const flipKey = `${isSpread ? "spread" : "single"}-${bookWidth}x${bookHeight}`;

  const handleFirstPageLoaded = (p: any) => {
    const w = p?.width ?? p?.originalWidth ?? p?.view?.[2];
    const h = p?.height ?? p?.originalHeight ?? p?.view?.[3];
    if (w && h) {
      const ratio = h / w;
      if (ratio > 0.2 && ratio < 5 && Math.abs(ratio - aspect) > 0.01) {
        setAspect(ratio);
      }
    }
  };

  const handleDocLoaded = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPagesLoaded(0);
  };

  const isReady = numPages > 0 && pagesLoaded >= numPages;

  return (
    <div
      ref={containerRef}
      className="w-full h-[88vh] flex items-center justify-center relative"
      style={{ padding: OUTER_PADDING }}
    >
      {/* Loading overlay for flipbook area only */}
      {!isReady && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl">
          <div className="flex items-center gap-3 text-sm sm:text-base">
            <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            <span className="font-medium">Loading…{numPages ? ` (${pagesLoaded}/${numPages})` : ""}</span>
          </div>
        </div>
      )}

      {!fileSpec && !error && <div className="opacity-70 p-6">Loading PDF…</div>}
      {error && <div className="opacity-70 p-6">Couldn't load PDF. {error}</div>}

      {fileSpec && (
        <Document
          file={fileSpec}
          onLoadSuccess={handleDocLoaded}
          loading={<div className="opacity-70 p-6">Preparing pages…</div>}
          error={<div className="opacity-70 p-6">PDF render error.</div>}
          className="w-full h-full relative"
        >
          <HTMLFlipBook
            key={flipKey}
            size="fixed"
            autoSize={false}
            width={pageWidth}
            height={pageHeight}
            minWidth={200}
            maxWidth={1200}
            minHeight={300}
            maxHeight={1600}
            flippingTime={600}
            mobileScrollSupport={true}
            style={{
              width: `${bookWidth}px`,
              height: `${bookHeight}px`,
              margin: "0 auto",
              display: "block",
              opacity: isReady ? 1 : 0.4,
              transition: "opacity 200ms ease",
            }}
            usePortrait={!isSpread}
            showCover={true}
            startPage={0}
            drawShadow={false}
            maxShadowOpacity={0}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            startZIndex={0}
            className="html-flip-book rounded-xl overflow-hidden shadow-soft mx-auto"
          >
            {/* JPG Cover Page */}
            <div key="cover" className="page-content">
              <img
                src="/book/Souls_D20_Book_Cover.jpg"
                alt="Souls D20 Book Cover"
                style={{
                  width: pageWidth,
                  height: pageHeight,
                  objectFit: 'cover',
                  display: 'block'
                }}
                onLoad={() => {
                  // Count cover as loaded
                  setPagesLoaded((n) => Math.min(n + 1, numPages));
                }}
              />
            </div>

            {/* PDF Pages (starting from page 2) */}
            {pages.map((page) => (
              <div key={page} className="page-content">
                <Page
                  pageNumber={page}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  onLoadSuccess={(p: any) => {
                    if (page === 2) handleFirstPageLoaded(p); // Use page 2 for aspect ratio
                    setPagesLoaded((n) => (n < numPages ? n + 1 : n));
                  }}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </Document>
      )}
    </div>
  );
}
