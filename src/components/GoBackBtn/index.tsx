import { Link } from "react-router";

export const GoBackBtn = () => {
  return (
    <Link to="/" className="button button--black">
      <span>Go back</span>
    </Link>
  );
};
