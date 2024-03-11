import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ onLoadMore }) => {
  return (
    <button
      className={css.loadMoreBtn}
      onClick={() => onLoadMore()}
      type="button"
      title="Load more"
    >
      Load More
    </button>
  );
};

export default LoadMoreBtn;
