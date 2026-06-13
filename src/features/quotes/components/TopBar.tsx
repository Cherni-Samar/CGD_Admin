import React from "react";
import "../../../shared/styles/Dashboard.css";

type Props = {
  quoteCount: number;
  onRefresh: () => void;
};

const TopBar: React.FC<Props> = ({ quoteCount, onRefresh }) => {
  const now = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="dash-topbar">
      <div className="topbar-date">{now}</div>

      <div className="topbar-right">
        <div className="live-badge">
          <span className="live-dot" />
          Live · {quoteCount} quotes
        </div>

        <button className="refresh-btn" onClick={onRefresh}>
          Refresh
        </button>
      </div>
    </div>
  );
};

export default TopBar;