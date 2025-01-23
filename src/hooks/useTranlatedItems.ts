import { useTranslation } from "react-i18next";
import { SortItem } from "../redux/filter/types";

export const useTranslatedSortItems = (): SortItem[] => {
  const { t } = useTranslation("home", { keyPrefix: "sort" });

  const sortPopup = t("popup", { returnObjects: true }) as SortItem[];

  return sortPopup;
};

export const useTranslatedCategories = () => {
  const { t } = useTranslation("home");

  const categories = t("categories", { returnObjects: true }) as string[];

  return categories;
};

export const useTranslatedTypes = () => {
  const { t } = useTranslation("home", { keyPrefix: "pizza_block" });

  const typeNames = t("selector.name", { returnObjects: true }) as string[];

  return typeNames;
};
