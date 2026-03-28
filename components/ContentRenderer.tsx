"use client";

import type { ContentBlock } from "@/types";
import { useState, useEffect, useCallback } from "react";

interface ContentRendererProps {
  content: ContentBlock[];
}

function GalleryLightbox({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, goNext, goPrev]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 backdrop-blur-md border border-white/20"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10 text-white/80 text-sm font-semibold bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          className="absolute left-3 sm:left-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 backdrop-blur-md border border-white/20"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        className="relative z-[1] max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Gallery image ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl shadow-black/50 animate-fade-in"
        />
      </div>

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          className="absolute right-3 sm:right-6 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 backdrop-blur-md border border-white/20"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  const [expandedCode, setExpandedCode] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);

  return (
    <>
      {/* Lightbox Modal */}
      {lightbox && (
        <GalleryLightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      <div className="prose prose-invert dark:prose-invert max-w-none">
        {content.map((block, index) => {
          switch (block.type) {
            case "heading":
              return (
                <div key={index} className="mt-8 mb-6">
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-blue-600 to-orange-500 pb-2">
                    {block.value}
                  </h2>
                  <div className="h-1 bg-gradient-to-r from-orange-500 to-blue-600 rounded-full"></div>
                </div>
              );

            case "paragraph":
              return (
                <p
                  key={index}
                  className="text-gray-700 dark:text-gray-300 text-lg leading-8 mb-6"
                >
                  {block.value}
                </p>
              );

            case "link":
              return (
                <a
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-semibold"
                >
                  {block.label}
                </a>
              );

            case "list":
              // Check if this is a stats list (contains colons or pipes)
              const isStats = block.items?.some(
                (item) => item.includes(":") || item.includes("|"),
              );

              if (isStats) {
                return (
                  <div key={index} className="mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {block.items?.map((item, itemIndex) => {
                        const [label, value] = item.includes(":")
                          ? (() => {
                              const [first, ...rest] = item.split(":");
                              return [first.trim(), rest.join(":").trim()];
                            })()
                          : item.includes("|")
                            ? [
                                item.split("|")[0].trim(),
                                item.substring(item.indexOf("|") + 1).trim(),
                              ]
                            : [item, ""];
                        return (
                          <div
                            key={itemIndex}
                            className="bg-gradient-to-br from-orange-100 to-blue-100 dark:from-orange-900 dark:to-blue-900 border-2 border-orange-500 dark:border-orange-400 rounded-xl p-5 hover:shadow-2xl hover:shadow-orange-500/50 dark:hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 hover:border-blue-600"
                          >
                            <div className="flex flex-col items-center justify-between">
                              <span className="text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider">
                                {label}
                              </span>
                              {value && (
                                <span className="text-2xl font-black text-white bg-gradient-to-r from-orange-500 to-blue-600 px-5 py-2 rounded-full shadow-xl shadow-orange-500/50">
                                  {value}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              // Regular list rendering
              return (
                <ul key={index} className="list-none mb-6 space-y-3">
                  {block.items?.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="flex items-start text-lg leading-7 text-gray-700 dark:text-gray-300 pl-6 relative hover:text-orange-500 transition-colors duration-200"
                    >
                      <span className="absolute left-0 text-orange-500 font-bold text-2xl">
                        ▸
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              );

            case "quote":
              return (
                <blockquote
                  key={index}
                  className="border-l-4 border-orange-500 pl-6 italic my-8 text-gray-700 dark:text-gray-300 bg-gradient-to-r from-orange-50 via-blue-50 to-orange-50 dark:from-orange-900 dark:via-blue-900 dark:to-orange-900 p-6 rounded-r-xl shadow-lg hover:shadow-xl transition-all duration-300 relative"
                >
                  <span className="absolute -left-1 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500 to-blue-600 rounded-full"></span>
                  {block.value}
                </blockquote>
              );

            case "image":
              return (
                <figure key={index} className="my-8">
                  <img
                    src={block.src}
                    alt={block.alt || "Image"}
                    className="w-full rounded-lg shadow-lg"
                  />
                  {block.alt && (
                    <figcaption className="text-center text-gray-600 dark:text-gray-400 mt-2">
                      {block.alt}
                    </figcaption>
                  )}
                </figure>
              );

            case "code":
              return (
                <div
                  key={index}
                  className="bg-gray-900 dark:bg-gray-950 rounded-lg my-6 overflow-hidden"
                >
                  <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                    <span className="text-sm text-gray-400">
                      {block.language || "code"}
                    </span>
                    <button
                      onClick={() =>
                        setExpandedCode(expandedCode === index ? null : index)
                      }
                      className="text-xs text-primary hover:text-secondary"
                    >
                      {expandedCode === index ? "Collapse" : "Expand"}
                    </button>
                  </div>
                  <pre
                    className={`p-4 overflow-x-auto ${
                      expandedCode === index ? "" : "max-h-48"
                    } transition-all duration-300`}
                  >
                    <code className="text-gray-100 text-sm">{block.value}</code>
                  </pre>
                </div>
              );

            case "gallery":
              return (
                <div key={index} className="my-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {block.images?.map((imageUrl, imgIndex) => (
                      <button
                        key={imgIndex}
                        type="button"
                        onClick={() =>
                          setLightbox({ images: block.images!, index: imgIndex })
                        }
                        className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square group cursor-pointer border-0 p-0 bg-transparent"
                      >
                        <img
                          src={imageUrl}
                          alt={`Gallery image ${imgIndex + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                          <svg
                            className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                            />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );

            default:
              return null;
          }
        })}
      </div>
    </>
  );
}

