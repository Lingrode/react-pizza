import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLang } from "../../redux/lang/selectors";
import { supportedLngs } from "../../i18n";
import { setLang } from "../../redux/lang/slice";
import style from "./LangPopup.module.scss";

export const LangPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const currLang = useSelector(selectLang) as keyof typeof supportedLngs;
  const dispatch = useDispatch();

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
