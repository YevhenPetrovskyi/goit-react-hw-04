import css from './ErrorMessage.module.css';

const ErrorMessage = ({ children }) => {
  return (
    <div className={css.errorMsg}>
      <p>{children}</p>
    </div>
  );
};

export default ErrorMessage;
