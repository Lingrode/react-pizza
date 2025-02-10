import Toggle from "react-toggle";
import { useAppDispatch, useColorScheme } from "../../hooks";

import "react-toggle/style.css";

const ThemeToggle = () => {
  const { isDark, setTheme } = useColorScheme();
  const dispatch = useAppDispatch();

  return (
    <Toggle
      checked={isDark}
      onChange={({ target }) => dispatch(setTheme(target.checked))}
      icons={{ checked: "🌙", unchecked: "🔆" }}
      aria-label="Dark mode toggle"
    />
  );
};

export default ThemeToggle;
