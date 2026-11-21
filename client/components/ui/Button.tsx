interface ButonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  text = "Continue",
  variant = "primary",
  isLoading,
  ...props
}: ButonProps) {
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary:
      "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
  };

  return (
    <button
      disabled={isLoading || props.disabled}
      {...props}
      className={`${variants[variant]} w-full h-full py-2 px-4 font-medium`}
    >
      {text}
    </button>
  );
}
