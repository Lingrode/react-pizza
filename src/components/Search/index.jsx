import { useContext, useRef } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import style from "./Search.module.scss";
import { SearchContext } from "../../Contexts";

const Search = () => {
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();

  const onClickClear = () => {
    setSearchValue("");
    inputRef.current.focus();
  };

  return (
    <div className={style.headerSearch}>
      <IoIosSearch className={style.searchIcon} />
      <input
        type="text"
        placeholder="Search pizza..."
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        ref={inputRef}
      />
      {searchValue && (
        <IoMdClose onClick={() => onClickClear()} className={style.iconClose} />
      )}
    </div>
  );
};

export default Search;
