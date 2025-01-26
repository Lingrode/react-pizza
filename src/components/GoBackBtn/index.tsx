import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export const GoBackBtn = () => {
  const { t } = useTranslation("fullPizza");

  return (
    <Link to="/" className="button button--black">
      <span>{t("back_btn")}</span>
    </Link>
  );
};
