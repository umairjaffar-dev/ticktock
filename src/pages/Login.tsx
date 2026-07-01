import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../store/auth.store";
import { LoginFormFieldsSchema, type LoginFormFieldErrorsType, type LoginFormFieldsType } from "../api/responseTypes/auth";
import LoginForm from "../components/modules/auth/LoginForm";
import LoginImage from "../components/modules/auth/LoginImage";

// ---------------------------------------------------------------------------
// LoginPage — owns all form state, runs Zod, calls the auth store
// ---------------------------------------------------------------------------
const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  // ── Form state ────────────────────────────────────────────────────────────
  const [form_values, set_form_values] = useState<LoginFormFieldsType>({
    email: "",
    password: "",
    remember_me: false,
  });

  const [field_errors, set_field_errors] = useState<LoginFormFieldErrorsType>({});
  const [is_submitting, set_is_submitting] = useState(false);
  const [server_error, set_server_error] = useState<string | null>(null);

  // ── Field change handler — clears its own error on change ────────────────
  const handle_change = (
    field: keyof LoginFormFieldsType,
    value: string | boolean
  ) => {
    set_form_values((prev) => ({ ...prev, [field]: value }));

    if (field !== "remember_me" && field_errors[field as keyof LoginFormFieldErrorsType]) {
      set_field_errors((prev) => ({ ...prev, [field]: undefined }));
    }

    if (server_error) set_server_error(null);
  };

  // ── Submit handler ────────────────────────────────────────────────────────
  const handle_submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    set_field_errors({});
    set_server_error(null);

    // Client-side Zod validation
    const result = LoginFormFieldsSchema.safeParse(form_values);

    if (!result.success) {
      const mapped: LoginFormFieldErrorsType = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof LoginFormFieldErrorsType;
        if (!mapped[field]) {
          mapped[field] = issue.message;
        }
      }

      set_field_errors(mapped);
      return;
    }

    // Call auth store (dummy login)
    set_is_submitting(true);

    try {
      await login(
        result.data.email,
        result.data.password,
        result.data.remember_me
      );
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";
      set_server_error(message);
    } finally {
      set_is_submitting(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="flex min-h-screen bg-white">
      {/* Left — form panel */}
      <section className="flex w-full flex-col justify-center lg:w-1/2">
        {/* Server / credential error banner */}
        {server_error && (
          <div
            role="alert"
            className="mx-8 mb-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 sm:mx-12 lg:mx-14 xl:mx-16"
          >
            {server_error}
          </div>
        )}

        <LoginForm
          email={form_values.email}
          password={form_values.password}
          remember_me={form_values.remember_me ?? false}
          errors={field_errors}
          is_submitting={is_submitting}
          onChange={handle_change}
          onSubmit={handle_submit}
        />
      </section>

      {/* Right — branded image panel, decorative, hidden on mobile */}
      <section className="hidden lg:block lg:w-1/2" aria-hidden="true">
        <LoginImage />
      </section>
    </main>
  );
};

export default LoginPage;