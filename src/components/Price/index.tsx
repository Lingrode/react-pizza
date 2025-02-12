import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { selectRate } from "../../redux/rate/selectors";

type Props = {
  priceInUAH: number;
};

export const Price = ({ priceInUAH }: Props) => {
  const { i18n } = useTranslation();
  const rate = useSelector(selectRate);

  const convertedPrice =
    i18n.language === "en" ? (priceInUAH * rate).toFixed(2) : priceInUAH;

  return (
    <span>
      {i18n.language === "ua" ? `${priceInUAH} ₴` : `$${convertedPrice}`}
    </span>
  );
};
