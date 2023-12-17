import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'
import Loader from "../Loader/Loader";

export default function ImageGallery({images, handleClick, loader, btnDisable, keyWord}) {
  return (
    <div>
      {
        images?.length > 0 && (
          <ul className={css.imageList}>
            {
              images?.map(el => (
                <ImageGalleryItem
                  key={el.id}
                  image={el}
                />
              ))
            }
          </ul>
        )
      }
      {
        loader ? <Loader/>
          : images?.length === 0 ? <h1>Opps, {keyWord} is not defined</h1>
            : <button
              type="click"
              onClick={handleClick}
              disabled={btnDisable}
            >load more
            </button>
      }
    </div>
  );
}


