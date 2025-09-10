"use client";
import { MapContainer, ImageOverlay, Marker, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngBoundsLiteral, LatLngLiteral } from "leaflet";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
const MapPopover = dynamic(() => import("./MapPopover"), { ssr: false });

// Map dimensions match the actual image size
const IMAGE_WIDTH = 6144;
const IMAGE_HEIGHT = 4608;

// Starting view position [y, x] in pixels
const START_CENTER: [number, number] = [1224, 2370];

// Zoom limits beyond the default "fit to view" zoom
const ZOOM_OUT_EXTRA = 1;
const ZOOM_IN_EXTRA = 2;
const DEFAULT_ZOOM_OFFSET = -0.25; // slightly zoomed out on load

// Map bounds define the coordinate system
const BOUNDS: LatLngBoundsLiteral = [
  [0, 0],
  [IMAGE_HEIGHT, IMAGE_WIDTH],
];

// Landmark definitions with positions and content
const landmarks = [
  {
    id: "gil-othrond",
    name: "Gil Othrond",
    pos: [IMAGE_HEIGHT-3339, 3193] as [number, number],
    img: "/images/landmarks/Gil Othrond.jpg",
    text: "The Capital of the Empire, the seat of power and commerce. Golden and everyone gazing at the Erd Tree"
  },
  {
    id: "mirro",
    name: "Mirro",
    pos: [IMAGE_HEIGHT-2138, 2585] as [number, number],
    img: "/images/landmarks/Mirro.jpg",
    text: "Lake city of the Sunless Isle"
  },
  {
    id: "upper-halloe",
    name: "Upper Halloe",
    pos: [IMAGE_HEIGHT-3622, 912] as [number, number],
    img: "/images/landmarks/Upper Halloe.jpg",
    text: "Island City near Umyss Keep where the ancient dragon, by the name of Umyss, according to tale resides"
  },
  {
    id: "nocstend",
    name: "Nocstend",
    pos: [IMAGE_HEIGHT-2977, 1868] as [number, number],
    img: "/images/landmarks/Nocstend.jpg",
    text: "The major city of the Forest of Stars and home of the Noctpriest and their Orthodoxy"
  },
];

// Convert pixel coordinates to Leaflet format
const toLatLng = (px: [number, number]): LatLngLiteral => ({ lat: px[0], lng: px[1] });

// Create golden breathing circle markers
const createGoldenCircleIcon = () => {
  return L.divIcon({
    html: `<div class="golden-marker"></div>`,
    className: 'custom-marker-container',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

export default function WorldMapInner() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Currently selected landmark popover
  const [active, setActive] = useState<{
    id: string;
    title: string;
    body: string;
    img?: string;
    latlng: LatLngLiteral;
  } | null>(null);

  // Popover position on screen
  const [screenPos, setScreenPos] = useState<{ x: number; y: number } | null>(null);

  return (
    <div
      ref={wrapperRef}
      className="relative rounded-2xl overflow-hidden shadow-soft w-full"
      style={{ height: "80vh" }}
    >
      <MapContainer
        crs={L.CRS.Simple}
        center={START_CENTER}
        zoom={0}
        zoomControl={true}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        maxBounds={BOUNDS}
        maxBoundsViscosity={1.0}
        wheelPxPerZoomLevel={120}
        zoomSnap={0.25}
        zoomDelta={0.25}
      >
        <ImageOverlay url="/map/SD20WorldMap.jpg" bounds={BOUNDS} />

        {landmarks.map((l) => (
          <Marker
            key={l.id}
            position={toLatLng(l.pos)}
            icon={createGoldenCircleIcon()}
            eventHandlers={{
              click: (e) => {
                const map = e.target._map as L.Map;
                const p = map.latLngToContainerPoint(e.latlng);
                setActive({
                  id: l.id,
                  title: l.name,
                  body: l.text,
                  img: l.img,
                  latlng: e.latlng,
                });
                setScreenPos({ x: p.x, y: p.y });
              },
            }}
          />
        ))}

        {/* Set up zoom limits and initial view */}
        <FitAndLimit
          bounds={BOUNDS}
          startCenter={START_CENTER}
          zoomOutExtra={ZOOM_OUT_EXTRA}
          zoomInExtra={ZOOM_IN_EXTRA}
          defaultZoomOffset={DEFAULT_ZOOM_OFFSET}
        />

        {/* Track popover position as map moves */}
        <FollowActivePopover
          active={!!active}
          latlng={active?.latlng ?? null}
          onRecalc={(pt) => setScreenPos(pt)}
        />

        <DismissOnMapClick onDismiss={() => setActive(null)} />
      </MapContainer>

      {/* Floating landmark popover */}
      <AnimatePresence>
        {active && screenPos && (
          <MapPopover
            x={screenPos.x}
            y={screenPos.y}
            title={active.title}
            body={active.body}
            imgSrc={active.img}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Set up zoom limits and initial map view
function FitAndLimit({
  bounds,
  startCenter,
  zoomOutExtra,
  zoomInExtra,
  defaultZoomOffset,
}: {
  bounds: LatLngBoundsLiteral;
  startCenter: [number, number];
  zoomOutExtra: number;
  zoomInExtra: number;
  defaultZoomOffset: number;
}) {
  const map = useMap();
  useEffect(() => {
    const fitZoom = map.getBoundsZoom(bounds, true);
    map.setMinZoom(fitZoom - zoomOutExtra);
    map.setMaxZoom(fitZoom + zoomInExtra);
    map.setMaxBounds(bounds);
    map.setView(startCenter, fitZoom + defaultZoomOffset, { animate: false });
  }, [map, bounds, startCenter, zoomOutExtra, zoomInExtra, defaultZoomOffset]);
  return null;
}

// Keep popover positioned correctly as map moves
function FollowActivePopover({
  active,
  latlng,
  onRecalc,
}: {
  active: boolean;
  latlng: LatLngLiteral | null;
  onRecalc: (pt: { x: number; y: number } | null) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!active || !latlng) {
      onRecalc(null);
      return;
    }

    const recalc = () => {
      const p = map.latLngToContainerPoint(latlng);
      onRecalc({ x: p.x, y: p.y });
    };

    recalc();
    map.on("move zoom resize", recalc);
    return () => {
      map.off("move zoom resize", recalc);
    };
  }, [active, latlng, map, onRecalc]);

  return null;
}

// Close popover when clicking empty map areas
function DismissOnMapClick({ onDismiss }: { onDismiss: () => void }) {
  useMapEvents({
    click: () => onDismiss(),
  });
  return null;
}
