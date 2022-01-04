import PropTypes from "prop-types";
import React, { useEffect } from "react";
import s from "./Modal.module.css";

function Modal({ largeImageURL, alt, onClick }) {
  useEffect(() => {
    window.addEventListener("keydown", cleanEventListener);
    return () => {
      window.removeEventListener("keydown", cleanEventListener);
    };
  });

  const cleanEventListener = (e) => {
    if (e.code === "Escape") {
      onClick();
    }
  };

  const backdrop  = (e) => {
    if (e.target === e.currentTarget) {
      onClick();
    }
  };
  
    return (
      // <div className={s.Overlay} onClick={onClick }>
       <div className={s.Overlay} onClick={backdrop }>
        <div className={s.Modal}>
          <img src={largeImageURL} alt={alt} />
        </div>
      </div>
    );
  }

  export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};
