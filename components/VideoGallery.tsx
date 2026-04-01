"use client";

import { useState, useEffect } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";

const videos = [
  {
    id: "RBp85wPr54o",
    title: "Blasters of Bharat Match Highlight 1",
  },
  {
    id: "tWttSoiljXQ",
    title: "Blasters of Bharat Match Highlight 2",
  },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveVideo(null);
      }
    };
    if (activeVideo) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {videos.map((video) => (
          <div 
            key={video.id} 
            className="group relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-gray-200 dark:bg-gray-800 cursor-pointer"
            onClick={() => setActiveVideo(video.id)}
          >
            {/* Thumbnail */}
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 bg-orange-500/90 rounded-full flex items-center justify-center text-white shadow-xl backdrop-blur-sm transform transition-transform group-hover:scale-110">
                <FaPlay className="w-6 h-6 ml-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity"
            onClick={() => setActiveVideo(null)}
          />
          
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-end animate-modal-in">
            {/* Close Button above the video frame */}
            <button
              onClick={() => setActiveVideo(null)}
              className="mb-4 text-white hover:text-orange-500 transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-md"
              aria-label="Close modal"
            >
              <FaTimes className="w-6 h-6" />
            </button>
            
            {/* Video Container */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10">
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                title="YouTube video player" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in {
          animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
