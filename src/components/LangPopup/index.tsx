import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { supportedLngs } from "../../i18n";
import { selectLang } from "../../redux/lang/selectors";
import { setLang } from "../../redux/lang/slice";
import { useAppDispatch } from "../../hooks";

import style from "./LangPopup.module.scss";

export const LangPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currLang = useSelector(selectLang) as keyof typeof supportedLngs;
  const dispatch = useAppDispatch();

  const changeLang = (lang: string) => {
    dispatch(setLang(lang));
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !event.composedPath().includes(langRef.current))
        setIsOpen(false);
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={style.langPopup} ref={langRef}>
      <b onClick={() => setIsOpen(!isOpen)}>
        {supportedLngs[currLang].slice(0, 2)}
      </b>

      {isOpen && (
        <div className={`${style.langList} ${isOpen ? `${style.active}` : ""}`}>
          <ul>
            {Object.entries(supportedLngs).map(([code, name]) => (
              <li
                key={code}
                onClick={() => changeLang(code)}
                className={`${currLang === code ? `${style.active}` : ""}`}
              >
                {name.slice(0, 2)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
