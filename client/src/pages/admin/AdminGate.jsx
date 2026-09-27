import { useState } from "react";
import { Outlet } from "react-router-dom";
import { getAdminToken } from "../../lib/api";
import { AdminLogin } from "./AdminLogin";

export function AdminGate() {
  const [loggedIn, setLoggedIn] = useState(() => !!getAdminToken());

  if (!loggedIn) {
    return <AdminLogin onSuccess={() => setLoggedIn(true)} />;
  }

  return <Outlet />;
}
