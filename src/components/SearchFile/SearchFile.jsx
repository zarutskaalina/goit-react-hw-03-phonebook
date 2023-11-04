import style from './SearchFile.module.css';

export const SearchFile = ({ onChange, filter }) => {
  return (
    <div>
      <label htmlFor="filter">
        Find contact by name
        <br />
        <input
          className={style.searchContact}
          name="filter"
          placeholder="Find"
          onChange={onChange}
          value={filter}
        />
      </label>
    </div>
  );
};
