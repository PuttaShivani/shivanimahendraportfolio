"use client";

import React, { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Sparkles, Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CinematicAboutVideoProps {
  className?: string;
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  fullScreenBg?: boolean;
}

export function CinematicAboutVideo({
  className,
  videoSrc = "/Character_speaking_to_camera_202608241437.mp4",
  title = "Interactive AI Avatar",
  subtitle = "Speaking to Camera",
  fullScreenBg = false,
}: CinematicAboutVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [videoSrc]);

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const nextMuted = !isMuted;

    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      videoRef.current.volume = 1.0;
      if (!nextMuted) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
      }
    }
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = nextMuted;
      modalVideoRef.current.volume = 1.0;
      if (!nextMuted) {
        modalVideoRef.current.play().then(() => setIsPlaying(true)).catch(() => { });
      }
    }
    setIsMuted(nextMuted);
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        if (modalVideoRef.current) modalVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        if (modalVideoRef.current) modalVideoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const openFullscreenModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFullscreenModalOpen(true);
  };

  const closeFullscreenModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsFullscreenModalOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "relative w-full rounded-2xl overflow-hidden bg-zinc-950/90 border border-purple-500/20 shadow-2xl shadow-purple-950/40 group transition-all duration-500 hover:border-purple-500/40",
          fullScreenBg && "rounded-none border-none shadow-none bg-transparent hover:border-none",
          className
        )}
        onClick={togglePlay}
      >
        {/* Background Glow */}
        {!fullScreenBg && (
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-indigo-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        )}

        {/* Video Container */}
        <div className={cn(
          "relative w-full overflow-hidden flex items-center justify-center bg-black cursor-pointer",
          fullScreenBg ? "h-full" : "aspect-video sm:aspect-square lg:aspect-[4/3]"
        )}>
          {!hasVideoError ? (
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onLoadedData={() => setIsLoaded(true)}
              onError={() => setHasVideoError(true)}
              className={cn(
                "w-full h-full object-cover object-center transition-all duration-700",
                !fullScreenBg && "group-hover:scale-[1.03]",
                !isLoaded && "opacity-0"
              )}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-zinc-900 to-zinc-950 text-zinc-400">
              <Sparkles className="w-12 h-12 text-purple-400 mb-3 animate-bounce" />
              <p className="text-sm font-medium text-white">{title}</p>
              <p className="text-xs text-zinc-500 mt-1">Video preview mode</p>
            </div>
          )}

          {/* Video Overlay Gradient */}
          {!fullScreenBg && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
          )}

          {/* Top Badges & Audio / Fullscreen Buttons */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-purple-500/30 text-xs font-medium text-purple-300 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>{title}</span>
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={toggleMute}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-600/90 hover:bg-purple-600 text-white backdrop-blur-md border border-purple-400/40 text-xs font-semibold shadow-lg shadow-purple-900/40 transition-all hover:scale-105 active:scale-95"
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-purple-200" />
                    <span>Enable Sound</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />
                    <span>Sound On</span>
                  </>
                )}
              </button>

              <button
                onClick={openFullscreenModal}
                className="p-1.5 rounded-full bg-black/70 hover:bg-purple-600 text-white backdrop-blur-md border border-purple-400/30 text-xs shadow-lg transition-all hover:scale-105 active:scale-95"
                title="Expand Full Screen View"
              >
                <Maximize2 className="w-4 h-4 text-purple-200" />
              </button>
            </div>
          </div>

          {/* Center Prominent Unmute Overlay if Muted */}
          {isMuted && isPlaying && !fullScreenBg && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <button
                onClick={toggleMute}
                className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/75 hover:bg-purple-600 text-white backdrop-blur-md border border-purple-400/40 text-xs font-medium shadow-2xl transition-all transform hover:scale-105 active:scale-95 animate-pulse"
              >
                <Volume2 className="w-4 h-4 text-purple-300" />
                <span>Tap to Turn On Sound</span>
              </button>
            </div>
          )}

          {/* Play/Pause Center Indicator on Click/Pause */}
          {!isPlaying && !fullScreenBg && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-xs z-10">
              <div className="p-4 rounded-full bg-purple-600/80 text-white shadow-xl shadow-purple-900/50 transform scale-110 animate-pulse">
                <Play className="w-8 h-8 fill-current translate-x-0.5" />
              </div>
            </div>
          )}

          {/* Bottom Details Overlay */}
          {!fullScreenBg && (
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-end justify-between pointer-events-none">
              <div>
                <p className="text-xs font-semibold text-white tracking-wide drop-shadow-md">
                  {subtitle}
                </p>
                <p className="text-[10px] text-purple-300/80 font-mono">
                  {isMuted ? "Audio Muted (Click button to unmute)" : "Audio Playing 🔊"}
                </p>
              </div>

              <div className="pointer-events-auto p-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 text-xs">
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current" />
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen View Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
          <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-950/80 bg-black">

            {/* Modal Header */}
            <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-xl border border-purple-500/40 text-xs font-semibold text-purple-200">
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                <span>AI Character Avatar — Full Screen Experience</span>
              </div>

              <div className="flex items-center gap-3 pointer-events-auto">
                <button
                  onClick={toggleMute}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600 text-white border border-purple-400/40 text-xs font-semibold shadow-lg hover:bg-purple-500 transition-all"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-300 animate-pulse" />}
                  <span>{isMuted ? "Unmute Sound" : "Sound Active"}</span>
                </button>

                <button
                  onClick={closeFullscreenModal}
                  className="p-2.5 rounded-full bg-zinc-900/90 hover:bg-red-600 text-white border border-zinc-700 transition-all hover:scale-105 active:scale-95"
                  title="Close Full Screen View"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Video Element */}
            <video
              ref={modalVideoRef}
              src={videoSrc}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CinematicAboutVideo;

