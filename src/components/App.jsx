import { createContext, useState } from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';

export const ContextForGalleryItem = createContext(null);

export default function App() {
  const [getSearchWord, setGetSearchWord] = useState(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [elementByModal, setElementByModal] = useState(null);

  const getElByModal = (el) => {
    setToggleModal(prev => !prev);
    setElementByModal(el);
  };

  return (
    <div>
      <Searchbar setGetSearchWord={setGetSearchWord} />
      {
        getSearchWord &&
        <ContextForGalleryItem.Provider value={getElByModal}>
          <ImageGallery
            keyWord={getSearchWord}
          />
        </ContextForGalleryItem.Provider>
      }
      {
        toggleModal && (
          <Modal
            setToggleModal={setToggleModal}
            elementByModal={elementByModal}
          />
        )
      }
    </div>
  );
}
