import { Link } from "react-router-dom";

/**
 * Atom. Renders as a <Link> when `to` is given (internal navigation),
 * otherwise as a real <button> (so it works with onClick/type="submit").
 * variant: "primary" | "ghost" | "brass"
 */
export function Button({ to, variant = "primary", className = "", children, ...rest }) {
  const classes = `btn btn--${variant} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
