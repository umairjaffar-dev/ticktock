import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LoginFormFieldsType } from "../api/responseTypes/auth";

// ---------------------------------------------------------------------------
// Dummy credentials — replace with real API call later
// ---------------------------------------------------------------------------
const DUMMY_USERS: Record<string, LoginFormFieldsType & { password: string }> = {
  "umairjaffar.dev@gmail.com": {
    id: "usr_001",
    name: "John Doe",
    email: "umairjaffar.dev@gmail.com",
    password: "password123",
    avatar_initials: "JD",
  },
};

// ---------------------------------------------------------------------------
// Store shape
// ---------------------------------------------------------------------------
interface AuthState {
  user: LoginFormFieldsType | null;
  token: string | null;
  is_authenticated: boolean;

  login: (
    email: string,
    password: string,
    remember_me?: boolean
  ) => Promise<void>;

  logout: () => void;
}

// ---------------------------------------------------------------------------
// Store — persisted to localStorage when remember_me is true
// ---------------------------------------------------------------------------
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      is_authenticated: false,

      login: async (email, password, remember_me = false) => {
        // Simulate network delay
        await new Promise((res) => setTimeout(res, 800));

        const record = DUMMY_USERS[email.toLowerCase()];

        if (!record || record.password !== password) {
          throw new Error("Invalid email or password.");
        }

        // const { password: _pw, ...user } = record;

        // Fake JWT token
        const token = btoa(
          JSON.stringify({ sub: record.id, email: record.email, remember_me })
        );

        set({ user:record, token, is_authenticated: true });
      },

      logout: () => {
        set({ user: null, token: null, is_authenticated: false });
      },
    }),
    {
      name: "ticktock_auth",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        is_authenticated: state.is_authenticated,
      }),
    }
  )
);