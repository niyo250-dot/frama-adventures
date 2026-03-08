import { useState } from 'react';

export default function GalleryGrid({ images }) {
  const [index, setIndex] = useState(-1);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="columns-2 md:columns-4 gap-2">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.url}
            alt="gallery"
            className="mb-2 w-full object-cover cursor-pointer hover:opacity-75"
            onClick={() => setIndex(idx)}
          />
        ))}
      </div>
      {index >= 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIndex(-1)}
        >
          <img
            src={images[index].url}
            alt="gallery"
            className="max-h-full max-w-full"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIndex(-1)}
          >
            ×
          </button>
          <button
            className="absolute left-5 text-white text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index + images.length - 1) % images.length);
            }}
          >
            ‹
          </button>
          <button
            className="absolute right-5 text-white text-3xl"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((index + 1) % images.length);
            }}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
