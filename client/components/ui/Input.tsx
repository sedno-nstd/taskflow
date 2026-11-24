interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export function Input({
  className = "",
  required,
  label,
  leftIcon,
  error,
  value = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full h-full relative">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      {leftIcon && (
        <span className="pointer-events-none absolute left-3 top-1/2 bottom-1/2 hover:bg-gray-600 cursor-pointer flex items-center  text-zinc-400">
          {leftIcon}
        </span>
      )}
      <input
        type="text"
        required={required}
        value={value ?? ""}
        className={`w-full py-2 px-4 border  text-sm font-medium outline-none rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed  
          ${error ? "border-red-500 focus:border-red-600 " : "border-gray-500 hover:border-blue-600 focus:border-blue-700"} 
          ${leftIcon && "pl-10"}
          ${className}`}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500 font-medium">{error}</span>
      )}
    </div>
  );
}
