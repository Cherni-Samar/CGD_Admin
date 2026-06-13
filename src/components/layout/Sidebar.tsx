import { IconGrid, IconStar, IconCar, IconCog, IconLogout } from "../../utils/icons";
import "../../pages/Dashboard.css";
import { useTheme } from "../../state/ThemeContext";

const ThemeToggle = ({ toggle }: {toggle: () => void }) => (
  <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
    <div className="theme-toggle-thumb" />
  </button>
);

const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export const Sidebar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
  <div className="dash-sidebar">
    <div className="sidebar-logo">
      <div className="sidebar-logo-circle">CGD</div>
      <div className="sidebar-logo-text">
        California <span>Golden</span>
        <div className="sidebar-logo-subtitle">Detailers</div>
      </div>
    </div>

    <div className="sidebar-section-label">Main</div>
    <button className="nav-item" onClick={() => window.location.href = "/dashboard"}>
      <IconGrid /> Dashboard
    </button>
    <button className="nav-item active" onClick={() => window.location.href = "/gallery"}>
      <IconStar /> Gallery
    </button>

    <div className="sidebar-section-label">Manage</div>
    <button className="nav-item"><IconCar /> Services</button>
    <button className="nav-item"><IconStar /> Reviews</button>
    <button className="nav-item"><IconCog /> Settings</button>

    <div className="sidebar-footer">
      <div className="sidebar-theme-row">
        <span className="sidebar-theme-label">{theme === "dark" ? "Dark mode" : "Light mode"}</span>
        <ThemeToggle toggle={toggleTheme} />
      </div>
      <button className="nav-item nav-item-logout" onClick={logout}>
        <IconLogout /> Logout
      </button>
    </div>
  </div>
)
};