import { Trans, useTranslation } from "react-i18next";
import style from "./ErrorMessage.module.scss";

export const ErrorMessage = () => {
  const { t } = useTranslation("notFound");

  return (
    <>
      <div className={style.containerError}>
        <div className={style.error}>
          <h2>
            {t("error_title")} <span>😕</span>
          </h2>
          <p>
            <Trans i18nKey="error_text" components={{ br: <br /> }}>
              {t("error_text")}
            </Trans>
          </p>
        </div>
      </div>
    </>
  );
};
