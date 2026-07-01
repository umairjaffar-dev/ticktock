import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

// ---------------------------------------------------------------------------
// Lazy-loaded pages — keeps initial bundle lean
// ---------------------------------------------------------------------------
const Dashboard = React.lazy(
  () => import("../pages/Dashboard")
);

// ---------------------------------------------------------------------------
// AppRouter
// ---------------------------------------------------------------------------
const AppRouter = () => {
  return (
    <BrowserRouter>
      <React.Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          </div>
        }
      >
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;