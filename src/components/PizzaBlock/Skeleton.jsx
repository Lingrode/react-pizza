import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={300}
    height={450}
    viewBox="0 0 300 450"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="15" ry="15" width="300" height="190" />
    <rect x="15" y="212" rx="15" ry="15" width="268" height="35" />
    <rect x="15" y="279" rx="15" ry="15" width="268" height="73" />
    <rect x="15" y="394" rx="15" ry="15" width="100" height="27" />
    <rect x="152" y="383" rx="25" ry="25" width="135" height="45" />
  </ContentLoader>
);

export default MyLoader;
