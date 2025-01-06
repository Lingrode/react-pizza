import { useRef, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { changeSearchValue } from "../../redux/slices/filterSlice";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import debounce from "lodash.debounce";
import style from "./Search.module.scss";

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(changeSearchValue(str));
    }, 800),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(changeSearchValue(""));
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
