import ContentLoader from "react-content-loader";

export const Skeleton = () => {
  const isDark = document.body.classList.contains("dark");

  return (
    <ContentLoader
      className="pizza-block skeleton"
      speed={2}
      width={280}
      height={468}
      viewBox="0 0 280 468"
      backgroundColor={isDark ? "#2a2a2a" : "#f3f3f3"}
      foregroundColor={isDark ? "#3a3a3a" : "#ecebeb"}
    >
      <circle cx="140" cy="122" r="120" />
      <rect x="0" y="271" rx="4" ry="4" width="280" height="19" />
      <rect x="0" y="327" rx="10" ry="10" width="280" height="80" />
      <rect x="0" y="431" rx="10" ry="10" width="100" height="25" />
      <rect x="175" y="428" rx="10" ry="10" width="105" height="35" />
    </ContentLoader>
  );
};
