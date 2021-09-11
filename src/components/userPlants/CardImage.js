import React from "react";
const API = process.env.REACT_APP_BACKEND_IMAGE_BASE_URL;

const CardImage = ({ photo }) => {
  return (
    <>
      {photo && photo.includes("https://") ? (
        <img src={photo} alt="plant" className="plant-card-image" />
      ) : (
        <img src={`${API}${photo}`} alt="plant" className="plant-card-image" />
      )}
    </>
  );
};

export default CardImage;
