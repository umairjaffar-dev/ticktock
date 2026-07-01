import React, { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import Input from "../../primitives/Input";
import Checkbox from "../../primitives/Checkbox";
import ButtonPrimary from "../../primitives/ButtonPrimary";

export interface LoginFormProps {
  email: string;
  password: string;
  remember_me: boolean;
  errors: Partial<Record<"email" | "password", string>>;
  is_submitting: boolean;
  onChange: (
    field: "email" | "password" | "remember_me",
    value: string | boolean
  ) => void;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar_initials: string;
}

const LoginForm = ({
  email,
  password,
  remember_me,
  errors,
  is_submitting,
  onChange,
  onSubmit,
}: LoginFormProps) => {
  const [show_password, set_show_password] = useState(false);

  const toggle_password = () => set_show_password((prev) => !prev);

  return (
    <div className="flex w-full flex-col justify-center px-8 py-16 sm:px-12 lg:px-14 xl:px-16">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome back
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Sign in to manage your timesheets.
        </p>
      </div>

      {/* Form — noValidate lets Zod own all validation */}
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        {/* Email */}
        <Input
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => onChange("email", e.target.value)}
          error={errors.email}
          disabled={is_submitting}
        />

        {/* Password with show/hide toggle via right_slot */}
        <Input
          id="password"
          label="Password"
          type={show_password ? "text" : "password"}
          autoComplete="current-password"
          placeholder="••••••••••"
          value={password}
          onChange={(e) => onChange("password", e.target.value)}
          error={errors.password}
          disabled={is_submitting}
          right_slot={
            <button
              type="button"
              onClick={toggle_password}
              aria-label={show_password ? "Hide password" : "Show password"}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex={-1}
            >
              {show_password ? (
                <MdVisibilityOff size={18} aria-hidden />
              ) : (
                <MdVisibility size={18} aria-hidden />
              )}
            </button>
          }
        />

        {/* Remember me */}
        <Checkbox
          id="remember_me"
          label="Remember me"
          checked={remember_me}
          onChange={(checked) => onChange("remember_me", checked)}
          disabled={is_submitting}
        />

        {/* Submit */}
        <ButtonPrimary
          type="submit"
          full_width
          is_loading={is_submitting}
          className="mt-1"
        >
          Sign in
        </ButtonPrimary>
      </form>
    </div>
  );
};

export default LoginForm;