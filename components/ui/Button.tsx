interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  // Map variant to style.css classes
  const variantClassMap = {
    primary: 'btn-accent',
    secondary: 'btn-beige',
    danger: 'btn-danger',
    success: 'btn-success',
  };

  const btnVariant = variantClassMap[variant];
  const btnSize = `btn-${size}`;

  return (
    <button
      className={`btn ${btnVariant} ${btnSize} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="btn-spin-icon" fill="none" viewBox="0 0 24 24">
            <circle className="btn-spin-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="btn-spin-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
