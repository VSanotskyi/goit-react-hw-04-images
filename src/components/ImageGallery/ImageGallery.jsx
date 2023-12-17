import {useEffect, useState} from 'react';
import {nanoid} from 'nanoid';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import {imagesApi} from '../../api/api';

const PER_PAGE = 12;

function calcPage(total, perPage, page) {
  return total / perPage < page;
}

function updateId(arr) {
  return arr.map(el => (
    {
      ...el,
      id: nanoid(),
    }),
  );
}

export default function ImageGallery({keyWord}) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [btnDisable, setBtnDisable] = useState(false);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setImages([])
    setPage(1)
    getImagesByKeyWord();
  }, [keyWord]);

  useEffect(() => {
    if (page === 1) return;

    getImagesByKeyWord();
  }, [page]);

  async function getImagesByKeyWord() {
    try {
      setLoader(true);
      const {data: {hits, totalHits}} = await imagesApi(keyWord, page,
        PER_PAGE);

      page === 1 ? setImages(updateId(hits)) : setImages(
        prev => [...prev, ...updateId(hits)]);

      setBtnDisable(calcPage(totalHits, PER_PAGE, page));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoader(false);
    }
  }

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div>
      {loader && <Loader/>}
      <div>
        {
          error ? <h1>{error}</h1> :
            images.length === 0 && !loader ?
              <p>Opps, {keyWord} is not defined</p> :
              <ul style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                listStyle: 'none',
              }}
              >
                {
                  images?.map(el => (
                    <ImageGalleryItem
                      key={el.id}
                      image={el}
                    />
                  ))
                }
              </ul>
        }
        {
          images.length > 0 &&
          <button
            type="click"
            onClick={handleClick}
            disabled={btnDisable}
          >load more
          </button>
        }
      </div>
    </div>
  );
}


