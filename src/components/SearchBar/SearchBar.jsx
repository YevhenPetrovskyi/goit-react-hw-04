import iziToast from 'izitoast';

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const searchValue = form.elements.searchInput.value;

    if (searchValue.trim() === '') {
      iziToast.warning({
        message: 'Please enter the search term!',
        position: 'topRight',
      });
      return;
    }
    onSearch(searchValue);
    form.reset();
  };

  return (
    <header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchInput"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
