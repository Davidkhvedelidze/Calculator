"use client";

import { useState } from "react";
import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80",
    alt: "Tbilisi Old Town with traditional architecture",
    title: "Tbilisi Old Town",
    description:
      "Historic district with colorful balconies and cobblestone streets",
  },
  {
    src: "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
    alt: "Caucasus Mountains in Svaneti region",
    title: "Svaneti Towers",
    description: "Ancient defensive towers in the UNESCO World Heritage region",
  },
  {
    src: "https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1200&q=80",
    alt: "Georgian wine region with vineyards",
    title: "Kakheti Vineyards",
    description: "Birthplace of wine with 8,000-year-old traditions",
  },
  {
    src: "https://images.unsplash.com/photo-1541849549-216549ae2161?auto=format&fit=crop&w=1200&q=80",
    alt: "Georgian Orthodox church architecture",
    title: "Orthodox Heritage",
    description: "Magnificent churches and monasteries across the country",
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    alt: "Georgian traditional dance performance",
    title: "Cultural Traditions",
    description: "Vibrant folk dances and polyphonic singing",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    alt: "Georgian cuisine and traditional food",
    title: "Culinary Delights",
    description: "Khachapuri, khinkali, and unique cooking methods",
  },
  {
    src: "https://images.unsplash.com/photo-1472055239152-c36b39e14e8c?auto=format&fit=crop&w=1200&q=80",
    alt: "Black Sea coast of Georgia",
    title: "Black Sea Coast",
    description: "Subtropical coastline with beautiful beaches and resorts",
  },
  {
    src: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&w=1200&q=80",
    alt: "Georgian mountain village",
    title: "Mountain Villages",
    description: "Traditional settlements in the high Caucasus",
  },
];

export function GeorgiaGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-display font-semibold   dark:text-slate-100">
          Georgia in Pictures
        </h2>
        <p className="text-lg   dark:text-slate-300">
          Explore the diverse beauty of Georgia through stunning photography
          showcasing its landscapes, culture, and architectural heritage.
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-semibold">{image.title}</h3>
              <p className="text-sm text-white/80">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="mt-4 text-center text-white">
              <h3 className="text-2xl font-semibold">{selectedImage.title}</h3>
              <p className="text-white/80">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
