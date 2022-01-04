import React from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

export default function ImageGallery({ modalOpen, result }) {
  return (
    <ul className={s.ImageGallery}>
      {result.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          alt={tags}
          src={webformatURL}
          url={largeImageURL}
          modalOpen={modalOpen}
        />
      ))}
    </ul>
  );
}
