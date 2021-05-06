import React from "react"

const CardImage = ({photo}) => {
  return (
    <>
      {photo.includes("https://") ? (
        <img src={photo} alt="plant" className="plant-card-image" />
      ) : (
        <img
          src={`http://localhost:3000${photo}`}
          alt="plant"
          className="plant-card-image"
        />
      )}
    </>
  );
};

export default CardImage;