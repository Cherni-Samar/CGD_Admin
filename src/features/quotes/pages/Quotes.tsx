import { useState } from "react";
import { useQuotes } from "../hooks/useQuotes";
import { Sidebar } from "../../../shared/layout/Sidebar";
import TopBar from "../components/TopBar";
import StatCard from "../components/StatCard";
import QuotesTable from "../components/QuoteTable";
import "../../../shared/styles/Dashboard.css";
import { IconSearch } from "../../../shared/utils/icons";


export default function QuotesAdmin() {
  const { quotes, loading, fetchQuotes, changeStatus, removeQuote } =
    useQuotes();

  const [search, setSearch] = useState("");

  const filtered = quotes.filter((q) =>
    q.firstName.toLowerCase().includes(search.toLowerCase()) ||
    q.email.toLowerCase().includes(search.toLowerCase()) ||
    q.city.toLowerCase().includes(search.toLowerCase()) ||
    q.service.toLowerCase().includes(search.toLowerCase())
  );

  const total = quotes.length;
  const pending = quotes.filter((q) => q.status === "pending").length;
  const confirmed = quotes.filter((q) => q.status === "confirmed").length;
  const done = quotes.filter((q) => q.status === "done").length;
  const refused = quotes.filter((q) => q.status === "refused").length;
  return (
    <div className="dash-container">
      <Sidebar />

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

          {/* SEARCH */}
          <div className="table-search">
            <span className="search-icon-svg">
              <IconSearch />
            </span>

            <input
              placeholder="Search quotes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {search && (
              <button className="clear-btn" onClick={() => setSearch("")}>
                ✕
              </button>
            )}
          </div>
          {/* STATS */}
          <div className="dash-cards">
            <StatCard title="Total Quotes" value={total} color="teal" />
            <StatCard title="Pending" value={pending} color="blue" />
            <StatCard title="Confirmed" value={confirmed} color="green" />
            <StatCard title="Done" value={done} color="teal" />
            <StatCard title="Refused" value={refused} color="red" />
          </div>

          {/* TABLE */}
          <QuotesTable
            quotes={filtered}
            loading={loading}
            onChangeStatus={changeStatus}
            onDelete={removeQuote}
          />
        </div>
      </div>
    </div>
  );
}