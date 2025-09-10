"use client";
import dynamic from "next/dynamic";
const PdfFlipClient = dynamic(() => import("./PdfFlipClient"), { ssr: false });
export default function Flipbook() { return <PdfFlipClient />; }
