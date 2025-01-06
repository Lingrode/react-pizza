import { useContext, useRef, useCallback, useState } from "react";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import debounce from "lodash.debounce";
import style from "./Search.module.scss";
import { SearchContext } from "../../Contexts";

const Search = () => {
  const { setSearchValue } = useContext(SearchContext);
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 800),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    setSearchValue("");
    setValue("");
    inputRef.current.focus();
  };

  return (
    <div className={style.headerSearch}>
      <IoIosSearch className={style.searchIcon} />
      <input
        type="text"
        placeholder="Search pizza..."
        value={value}
        onChange={(event) => onChangeInput(event)}
        ref={inputRef}
      />
      {value && (
        <IoMdClose onClick={() => onClickClear()} className={style.iconClose} />
      )}
    </div>
  );
};

export default Search;
