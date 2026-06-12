import { useState } from "react";

export const ActionBtn = ({
  label, icon, color, bg, hoverBg, onClick,
}: {
  label: string; icon: React.ReactNode; color: string;
  bg: string; hoverBg: string; onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        padding: "6px 0",
        borderRadius: 7,
        border: "none",
        background: hovered ? hoverBg : bg,
        color,
        fontSize: 11,
        fontWeight: 600,
        cursor: "pointer",
        backdropFilter: "blur(4px)",
        transition: "background 0.15s",
        letterSpacing: "0.02em",
      }}
    >
      {icon} {label}
    </button>
  );
};
