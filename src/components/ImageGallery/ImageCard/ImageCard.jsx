import css from './ImageCard.module.css';

const ImageCard = ({ image, onImageClick }) => {
  const imageData = {
    imageSrc: image.urls.regular,
    imageAltDescription: image.alt_description,
    imageDescription: image.description,
    imageAutor: image.user.name,
    imageLikes: image.likes,
  };

  return (
    <div className={css.imageCard} onClick={() => onImageClick(imageData)}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        width={380}
        height={260}
      />
    </div>
  );
};

export default ImageCard;
