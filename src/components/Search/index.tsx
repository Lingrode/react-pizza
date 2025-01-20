import { useRef, useCallback, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { changeSearchValue } from "../../redux/filter/slice";
import { IoIosSearch, IoMdClose } from "react-icons/io";
import debounce from "lodash.debounce";
import style from "./Search.module.scss";

export const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      dispatch(changeSearchValue(str));
    }, 800),
    []
  );

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(changeSearchValue(""));
    setValue("");
    inputRef.current?.focus();
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
