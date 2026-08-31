"use client";

import { useRef, useState } from "react";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

// Accepts one or more frame images. With multiple frames, dragging steps
// through them for a real 360° spin. Real multi-angle photography isn't
// available for the current catalog (each product has one photo), so with a
// single frame this falls back to an honest "tilt" demo — clearly labeled,
// never presented as a genuine 360° capture.
export default function Product360Viewer({ images = [], alt = "Product" }) {
  const frames = images.length > 0 ? images : ["/logo.svg"];
  const isMultiFrame = frames.length > 1;

  const [frameIndex, setFrameIndex] = useState(0);
  const [tiltAngle, setTiltAngle] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef(null);

  const getClientX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const handlePointerDown = (e) => {
    dragState.current = { startX: getClientX(e), startFrame: frameIndex };
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragState.current) return;
    const delta = getClientX(e) - dragState.current.startX;

    if (isMultiFrame) {
      const step = Math.round(delta / 14);
      let next = (dragState.current.startFrame - step) % frames.length;
      if (next < 0) next += frames.length;
      setFrameIndex(next);
    } else {
      setTiltAngle(Math.max(-22, Math.min(22, delta / 4)));
    }
  };

  const handlePointerUp = () => {
    dragState.current = null;
    setIsDragging(false);
    if (!isMultiFrame) setTiltAngle(0);
  };

  const currentImage = frames[frameIndex] || frames[0];

  const renderStage = () => (
    <div
      className="relative w-full h-full select-none touch-none cursor-grab active:cursor-grabbing overflow-hidden"
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <img
        src={currentImage}
        alt={alt}
        draggable={false}
        style={{
          transform: `${isZoomed ? "scale(1.5)" : "scale(1)"} ${
            !isMultiFrame ? `perspective(800px) rotateY(${tiltAngle}deg)` : ""
          }`,
          transition: isDragging ? "none" : "transform 0.3s ease",
        }}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 pointer-events-none">
        <RotateCw className="w-3.5 h-3.5" />
        {isMultiFrame ? "Drag to rotate 360°" : "Drag to tilt · 360° demo"}
      </div>

      {!isMultiFrame && (
        <div className="absolute top-3 left-3 bg-gray-900/80 text-white text-[10px] uppercase tracking-wide px-2 py-1 rounded-full pointer-events-none">
          360° preview (demo)
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
        {renderStage()}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => setIsZoomed((z) => !z)}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow"
            aria-label="Toggle zoom"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsFullscreen(true)}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow"
            aria-label="Open fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-6">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white"
            aria-label="Close fullscreen"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-2xl aspect-square">{renderStage()}</div>
        </div>
      )}
    </>
  );
}
