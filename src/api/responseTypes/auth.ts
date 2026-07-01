import { z } from "zod";

export const LoginFormFieldsSchema = z.object({
    id:z.string().optional(),
    name:z.string().optional(),
    avatar_initials:z.string().optional(),
  email: z.email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  remember_me: z.boolean().optional(),
});

export type LoginFormFieldsType = z.infer<typeof LoginFormFieldsSchema>;
export type LoginFormFieldErrorsType = Partial<Record<"email" | "password", string>>;
