import "./Button.css";

export default function Button({ children, variant = "primary", as: Component = "button", className = "", ...props }) {
  return (
    <Component className={`btn btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
