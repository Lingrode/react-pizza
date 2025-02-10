import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";

import { selectIsDark } from "../redux/theme/selector";
import { setTheme } from "../redux/theme/slice";

export function useColorScheme() {
  const isDark = useSelector(selectIsDark);

  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined
  );

  const value = useMemo(
    () => (isDark === undefined ? !!systemPrefersDark : isDark),
    [isDark, systemPrefersDark]
  );

  useEffect(() => {
    if (value) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [value]);

  return {
    isDark: value,
    setTheme,
  };
}
