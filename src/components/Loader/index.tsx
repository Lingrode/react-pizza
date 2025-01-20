import { RotatingLines } from "react-loader-spinner";
import styles from "./Loader.module.scss";

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <RotatingLines strokeColor="#fe5f1e" />
    </div>
  );
};
