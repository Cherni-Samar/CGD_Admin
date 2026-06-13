import React from "react";

type Props = {
  title: string;
  value: number;
  color?: "teal" | "blue" | "green" | "red";
  sub?: string;
};

export default function StatCard({
  title,
  value,
  color = "teal",
  sub,
}: Props) {
  return (
    <div className={`dash-card card-${color}`}>
      <div className="card-accent-bar" />

      <div className="card-title">{title}</div>

      <div className="card-value">{value}</div>

      {sub && <div className="card-sub">{sub}</div>}
    </div>
  );
}