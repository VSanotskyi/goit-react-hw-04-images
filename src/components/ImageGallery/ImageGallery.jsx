import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'
import Loader from "../Loader/Loader";

export default function ImageGallery({images, handleClick, loader}) {
  return (
    <div>
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
      {
        loader ? <Loader/> :
          <button
            type="click"
            onClick={handleClick}
          >load more
          </button>
      }
    </div>
  );
}


