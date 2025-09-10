"use client";
import dynamic from "next/dynamic";

// Ensure Leaflet/react-leaflet only load in the browser
const WorldMapInner = dynamic(() => import("./WorldMapInner"), { ssr: false });

export default function WorldMap() {
  return <WorldMapInner />;
}
