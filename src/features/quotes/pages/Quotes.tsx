import React, { useEffect, useState, useCallback } from "react";
import "../../../shared/styles/Dashboard.css";

// --- Types ---
interface Quote {
  _id: string;
  firstName: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  service: string;
  status: string;
  createdAt: string;
}

type Theme = "dark" | "light";

const API_URL = "http://localhost:3001/api";

const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

// --- THEME TOGGLE ---
const ThemeToggle = ({
  toggle,
}: {
  theme: Theme;
  toggle: () => void;
}) => (
  <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
    <div className="theme-toggle-thumb" />
  </button>
);

// --- SVG ICONS ---
const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect
      x="1"
      y="1"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <rect
      x="8"
      y="1"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <rect
      x="1"
      y="8"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <rect
      x="8"
      y="8"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.3"
    />
  </svg>
);


const IconCar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M2 8l1.5-3.5h7L12 8v2.5H2V8z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <circle
      cx="4"
      cy="10.5"
      r="1"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle
      cx="10"
      cy="10.5"
      r="1"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M7 1.5l1.5 3.2L12 5.2l-2.5 2.4.6 3.4L7 9.4l-3.1 1.6.6-3.4L2 5.2l3.5-.5L7 1.5z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);
const IconCog = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle
      cx="7"
      cy="7"
      r="2"
      stroke="currentColor"
      strokeWidth="1.3"
    />
    <path
      d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.2 3.2l.7.7M10.1 10.1l.7.7M3.2 10.8l.7-.7M10.1 3.9l.7-.7"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    />
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path
      d="M5.5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2.5M9.5 10l2.5-3-2.5-3M12 7H5.5"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconSearch = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <circle
      cx="5.5"
      cy="5.5"
      r="4"
      stroke="currentColor"
      strokeWidth="1.4"
    />
    <path
      d="M9 9l3 3"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  </svg>
);
const IconTrash = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path
      d="M2 3.5h9M5 3.5V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1M5.5 6v4M7.5 6v4M3 3.5l.5 7a.5.5 0 00.5.5h5a.5.5 0 00.5-.5l.5-7"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const IconRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path
      d="M11 6.5A4.5 4.5 0 112 6.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M11 3v3.5H7.5"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- SIDEBAR ---
const Sidebar = ({
  theme,
  toggleTheme,
}: {
  theme: Theme;
  toggleTheme: () => void;
}) => (
  <div className="dash-sidebar">
    <div className="sidebar-logo">
      <div className="sidebar-logo-circle">CGD</div>
      <div className="sidebar-logo-text">
        California <span>Golden</span>
        <div className="sidebar-logo-subtitle">Detailers</div>
      </div>
    </div>

    <div className="sidebar-section-label">Main</div>
    <button className="nav-item active">
      <IconGrid /> Dashboard
    </button>
   <button className="nav-item" onClick={() => window.location.href = "/gallery"}>
  <IconStar /> Gallery
</button>

    <div className="sidebar-section-label">Manage</div>
    <button className="nav-item">
      <IconCar /> Services
    </button>
    <button className="nav-item">
      <IconStar /> Reviews
    </button>
    <button className="nav-item">
      <IconCog /> Settings
    </button>

    <div className="sidebar-footer">
      <div className="sidebar-theme-row">
        <span className="sidebar-theme-label">
          {theme === "dark" ? "Dark mode" : "Light mode"}
        </span>
        <ThemeToggle theme={theme} toggle={toggleTheme} />
      </div>

      <button className="nav-item nav-item-logout" onClick={logout}>
        <IconLogout /> Logout
      </button>
    </div>
  </div>
);

// --- TOPBAR ---
const TopBar = ({
  quoteCount,
  onRefresh,
}: {
  quoteCount: number;
  onRefresh: () => void;
}) => {
  const now = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="dash-topbar">
      <div>
        <div className="topbar-date">{now}</div>
      </div>
      <div className="topbar-right">
        <div className="live-badge">
          <span className="live-dot" />
          Live &middot; {quoteCount} quotes
        </div>
        <button className="refresh-btn" onClick={onRefresh}>
          <IconRefresh /> Refresh
        </button>
      </div>
    </div>
  );
};

// --- STATUS HELPERS ---
const statusClass = (s: string) => {
  if (s === "confirmed") return "status-confirmed";
  if (s === "done") return "status-done";
  if (s === "refused") return "status-refused";
  return "status-pending";
};

const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1);

// --- STAT CARD ---
interface CardProps {
  title: string;
  value: number;
  color: "teal" | "blue" | "green" | "red";
  sub?: string;
}
const StatCard = ({ title, value, color, sub }: CardProps) => (
  <div className={`dash-card card-${color}`}>
    <div className="card-accent-bar" />
    <div className="card-title">{title}</div>
    <div className="card-value">{value}</div>
    {sub && <div className="card-sub">{sub}</div>}
  </div>
);

// --- MAIN DASHBOARD ---
const QuotesDashboard: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("theme") as Theme) || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const fetchQuotes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/quotes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      if (!res.ok) throw new Error();
      setQuotes(await res.json());
    } catch {
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`${API_URL}/quotes/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ status }),
      });
      setQuotes((prev) =>
        prev.map((q) => (q._id === id ? { ...q, status } : q))
      );
    } catch {
      alert("Error updating status");
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm("Delete this quote?")) return;
    try {
      await fetch(`${API_URL}/quotes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      setQuotes((prev) => prev.filter((q) => q._id !== id));
    } catch {
      alert("Error deleting quote");
    }
  };

  const total = quotes.length;
  const pending = quotes.filter((q) => q.status === "pending").length;
  const confirmed = quotes.filter((q) => q.status === "confirmed").length;
  const done = quotes.filter((q) => q.status === "done").length;
  const refused = quotes.filter((q) => q.status === "refused").length;

  const filtered = quotes.filter((q) => {
    const s = search.toLowerCase();
    return (
      !s ||
      q.firstName.toLowerCase().includes(s) ||
      q.email.toLowerCase().includes(s) ||
      q.city.toLowerCase().includes(s) ||
      q.service.toLowerCase().includes(s)
    );
  });

  return (
    <div className="dash-container">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      <div className="dash-main">
        <TopBar quoteCount={total} onRefresh={fetchQuotes} />

        <div className="dash-content">
          <div className="dash-welcome">
            <div>
              <h1>
                Welcome back, <span>Admin</span>
              </h1>
              <p>
                Here's what's happening with California Golden Detailers today.
              </p>
            </div>
          </div>

       

          <div className="dash-cards">
            <StatCard
              title="Total Quotes"
              value={total}
              color="teal"
              sub="All time"
            />
            <StatCard
              title="Pending"
              value={pending}
              color="blue"
              sub="Awaiting reply"
            />
            <StatCard
              title="Confirmed"
              value={confirmed}
              color="green"
              sub="Booked"
            />
            <StatCard
              title="Done"
              value={done}
              color="teal"
              sub="Completed"
            />
            <StatCard
              title="Refused"
              value={refused}
              color="red"
              sub="Cancelled"
            />
          </div>

          <div className="dash-table-section">
            <div className="table-header">
              <div className="table-header-left">
                <div className="table-header-title">Recent Quotes</div>
                <span className="table-count">{filtered.length} total</span>
              </div>
              <div className="table-search">
                <span className="search-icon-svg">
                  <IconSearch />
                </span>
                <input
                  type="text"
                  placeholder="Search quotes..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <table className="dash-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Vehicle</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="loading-row">
                    <td colSpan={8}>
                      <div className="loading-spinner">
                        <div className="spinner" />
                        Loading quotes...
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="empty-state">
                        <p>
                          {search
                            ? "No quotes match your search."
                            : "No quotes yet. They'll appear here once customers submit the form."}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((q) => (
                    <tr key={q._id}>
                      <td>
                        <div className="td-name">{q.firstName}</div>
                        <div className="td-email">{q.email}</div>
                      </td>
                      <td
                        style={{
                          color: "var(--text2)",
                          fontSize: ".8rem",
                        }}
                      >
                        {q.phone}
                      </td>
                      <td
                        style={{
                          color: "var(--text2)",
                          fontSize: ".8rem",
                        }}
                      >
                        {q.city}
                      </td>
                      <td
                        style={{
                          color: "var(--text2)",
                          fontSize: ".8rem",
                        }}
                      >
                        {q.vehicleType}
                      </td>
                      <td>
                        <span className="td-service">{q.service}</span>
                      </td>
                      <td
                        style={{
                          color: "var(--text2)",
                          fontSize: ".78rem",
                        }}
                      >
                        {new Date(q.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>
                        <span
                          className={`status-pill ${statusClass(q.status)}`}
                        >
                          {capitalize(q.status)}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <select
                            className="select-status"
                            value={q.status}
                            onChange={(e) =>
                              updateStatus(q._id, e.target.value)
                            }
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="done">Done</option>
                            <option value="refused">Refused</option>
                          </select>
                          <button
                            className="btn-delete"
                            onClick={() => deleteQuote(q._id)}
                            title="Delete quote"
                          >
                            <IconTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotesDashboard;