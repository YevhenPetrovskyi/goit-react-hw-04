import ImageCard from './ImageCard';

const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map(({ id, alt_description, urls: { small, regular } }) => {
        return (
          <li key={id}>
            <ImageCard img={small} altDescription={alt_description} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
