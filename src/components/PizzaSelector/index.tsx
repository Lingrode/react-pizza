import { useTranslation } from "react-i18next";

type PizzaSelectorProps = {
  activeType: number;
  setActiveType: (typeId: number) => void;
  activeSize: number;
  setActiveSize: (index: number) => void;
  types: number[];
  sizes: number[];
  typeNames: string[];
};

export const PizzaSelector = ({
  activeType,
  setActiveType,
  activeSize,
  setActiveSize,
  types,
  sizes,
  typeNames,
}: PizzaSelectorProps) => {
  const { t } = useTranslation("home", { keyPrefix: "pizza_block" });

  return (
    <div className="pizza-block__selector">
      <ul>
        {types.map((typeId) => (
          <li
            className={
              activeType === typeId || types.length === 1 ? "active" : ""
            }
            onClick={() => setActiveType(typeId)}
            key={typeId}
          >
            {typeNames[typeId]}
          </li>
        ))}
      </ul>
      <ul>
        {sizes.map((size, index) => (
          <li
            key={index}
            className={activeSize === index ? "active" : ""}
            onClick={() => setActiveSize(index)}
          >
            {t("selector.size", { size })}
          </li>
        ))}
      </ul>
    </div>
  );
};
