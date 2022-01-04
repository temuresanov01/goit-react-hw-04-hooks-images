import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ alt, src, url, modalOpen }) => {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => {
        modalOpen(url, alt);
      }}
    >
      <img src={src} alt={alt} className={s.ImageGalleryItemImage} />
    </li>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  modalOpen: PropTypes.func,
  alt: PropTypes.string.isRequired,
};
