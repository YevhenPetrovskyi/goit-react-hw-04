import { DNA } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = ({ loading }) => {
  return (
    <div className={styles.loaderContainer}>
      <DNA
        visible={loading}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
