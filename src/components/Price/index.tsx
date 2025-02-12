import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../hooks";
import { selectLastUpdated, selectRate } from "../../redux/rate/selectors";
import { getRate } from "../../redux/rate/operations";

type Props = {
  priceInUAH: number;
};

export const Price = ({ priceInUAH }: Props) => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const rate = useSelector(selectRate);
  const lastUpdated = useSelector(selectLastUpdated);

  useEffect(() => {
    if (!lastUpdated || Date.now() - lastUpdated > 24 * 60 * 60 * 1000) {
      dispatch(getRate());
    }
  }, [dispatch, lastUpdated, priceInUAH]);

  const convertedPrice =
    i18n.language === "en" ? (priceInUAH * rate).toFixed(2) : priceInUAH;

  return (
    <span>
      {i18n.language === "ua" ? `${priceInUAH} ₴` : `$${convertedPrice}`}
    </span>
  );
};
