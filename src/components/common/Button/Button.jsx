import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  fullWidth = false,
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`base-button ${variant} ${fullWidth ? 'full-width' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

