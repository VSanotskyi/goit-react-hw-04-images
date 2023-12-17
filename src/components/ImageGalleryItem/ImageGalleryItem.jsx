import { useContext } from 'react';

import { ContextForGalleryItem } from '../App';

export default function ImageGalleryItem({ image }) {
  const getElByModal = useContext(ContextForGalleryItem);
  const { previewURL, tags } = image;

  return (
    <li>
      <img
        style={{
          display: 'block',
          width: '150px',
          height: '100px',
        }}
        src={previewURL}
        alt={tags}
        onClick={() => getElByModal(image)}
      />
    </li>
  );
}
