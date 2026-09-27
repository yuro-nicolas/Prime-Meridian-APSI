import { NavLink, Outlet } from "react-router-dom";
import { api } from "../../lib/api";
import "./AdminLayout.css";


export function AdminLayout() {
  async function handleLogout() {
    await api.adminLogout();
    window.location.href = "/admin";
  }

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <div className="admin-bar__inner">
          <span className="admin-bar__brand">Prime Meridian — Admin</span>
          <nav className="admin-tabs">
            <NavLink to="/admin/listings" className={({ isActive }) => `admin-tab ${isActive ? "is-active" : ""}`}>
              Listings
            </NavLink>
            <NavLink to="/admin/messages" className={({ isActive }) => `admin-tab ${isActive ? "is-active" : ""}`}>
              Messages
            </NavLink>
          </nav>
          <button className="admin-bar__exit" onClick={handleLogout}>Log out</button>
          <a className="admin-bar__exit" href="/">Exit to site</a>
        </div>
      </header>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
