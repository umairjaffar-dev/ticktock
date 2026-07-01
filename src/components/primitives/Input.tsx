import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
  right_slot?: React.ReactNode;
}

const Input = ({
  label,
  error,
  id,
  right_slot,
  className = "",
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          className={[
            "w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 outline-none",
            "placeholder:text-gray-400 transition-colors duration-150",
            "focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15",
            right_slot ? "pr-11" : "",
            error
              ? "border-red-400 bg-red-50 focus:border-red-500 focus:ring-red-500/15"
              : "border-gray-300 bg-white hover:border-gray-400",
            className,
          ].join(" ")}
          {...rest}
        />

        {right_slot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {right_slot}
          </div>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;