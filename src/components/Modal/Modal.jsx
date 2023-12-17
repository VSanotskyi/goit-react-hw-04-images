import css from './Modal.module.css';

export default function Modal({ setToggleModal, elementByModal }) {
  const { webformatURL, tags } = elementByModal;

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setToggleModal(prev => !prev);
    }
  };

  return (
    <div
      className={css.Overlay}
      onClick={(e) => closeModal(e)}
    >
      <div className={css.Modal}>
        <img
          src={webformatURL}
          alt={tags}
        />
        <button
          className={css.Button}
          onClick={(e) => closeModal(e)}
        >
          close
        </button>
      </div>
    </div>
  );
}
