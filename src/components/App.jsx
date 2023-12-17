import {createContext, useEffect, useState} from 'react';
import {nanoid} from "nanoid";

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import {imagesApi} from "../api/api";
import Loader from "./Loader/Loader";

const PER_PAGE = 12;

export const ContextForGalleryItem = createContext(null);

export default function App() {
  const [keyWord, setKeyWord] = useState(null);
  const [images, setImages] = useState(null)
  const [page, setPage] = useState(1)
  const [toggleModal, setToggleModal] = useState(false);
  const [elementByModal, setElementByModal] = useState(null);
  const [loader, setLoader] = useState(false);
  const [btnDisable, setBtnDisable] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    if (!keyWord) return

    async function getImagesByKeyWord() {
      setLoader(true)
      try {
        const {data: {hits, totalHits}} = await imagesApi(keyWord, page,
          PER_PAGE);

        setImages(prev => page === 1 ? updateId(hits) : [...prev, ...updateId(hits)])
        setBtnDisable(calcPage(totalHits, PER_PAGE, page));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoader(false)
      }
    }

    getImagesByKeyWord()
  }, [keyWord, page]);


  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  const getElByModal = (el) => {
    setToggleModal(prev => !prev);
    setElementByModal(el);
  };

  return (
    <div>
      <Searchbar
        setKeyWord={setKeyWord}
        setPage={setPage}
      />
      {
        error && <h1>{error}</h1>
      }
      {
        images?.length === 0 && <h1>Opps, {keyWord} is not defined</h1>
      }
      {
        keyWord && (
          <ContextForGalleryItem.Provider value={getElByModal}>
            <ImageGallery
              images={images}
              handleClick={handleClick}
              loader={loader}
            />
          </ContextForGalleryItem.Provider>
        )
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

function calcPage(total, perPage, page) {
  return total / perPage < page;
}

function updateId(arr) {
  return arr?.map(el => (
    {
      ...el,
      id: nanoid(),
    }),
  );
}

