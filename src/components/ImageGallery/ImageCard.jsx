const ImageCard = ({ img, altDescription }) => {
  return (
    <div>
      <img src={img} alt={altDescription} />
    </div>
  );
};

export default ImageCard;
