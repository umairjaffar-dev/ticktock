import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  is_loading?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "outline";
  full_width?: boolean;
}

const ButtonPrimary = ({
  is_loading = false,
  children,
  variant = "primary",
  full_width = false,
  disabled,
  className = "",
  ...rest
}: ButtonProps) => {
  const base = [
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5",
    "text-sm font-semibold transition-all duration-150 outline-none cursor-pointer",
    "focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
  ].join(" ");

  const variants: Record<string, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-300 focus-visible:ring-blue-600",
    outline:
      "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 focus-visible:ring-gray-400",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 focus-visible:ring-gray-400",
  };

  return (
    <button
      disabled={disabled || is_loading}
      aria-busy={is_loading}
      className={[base, variants[variant], full_width ? "w-full" : "", className].join(
        " "
      )}
      {...rest}
    >
      {is_loading ? (
        <>
          <span
            className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
          <span>Signing in…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonPrimary;