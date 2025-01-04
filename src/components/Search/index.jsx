import { IoIosSearch, IoMdClose } from "react-icons/io";
import style from "./Search.module.scss";
import { useContext } from "react";
import { SearchContext } from "../../Contexts";

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);

  return (
    <div className={style.headerSearch}>
      <IoIosSearch className={style.searchIcon} />
      <input
        type="text"
        placeholder="Search pizza..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {searchValue && (
        <IoMdClose
          onClick={() => setSearchValue("")}
          className={style.iconClose}
        />
      )}
    </div>
  );
};

export default Search;
