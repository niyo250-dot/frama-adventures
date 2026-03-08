import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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
        <Lightbox
          mainSrc={images[index].url}
          nextSrc={images[(index + 1) % images.length].url}
          prevSrc={images[(index + images.length - 1) % images.length].url}
          onCloseRequest={() => setIndex(-1)}
          onMovePrevRequest={() => setIndex((index + images.length - 1) % images.length)}
          onMoveNextRequest={() => setIndex((index + 1) % images.length)}
        />
      )}
    </>
  );
}
