interface ButonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger" | "orange";
  className?: string;
}

export function Button({
  text = "Continue",
  variant = "primary",
  className,
  isLoading,
  ...props
}: ButonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary:
      "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
    orange:
      "bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium",
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      {...props}
      className={`${variants[variant]} w-full h-full font-medium ${className}`}
    >
      {text}
    </button>
  );
}
