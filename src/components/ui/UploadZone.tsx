import { useState, useRef } from "react";
import { IconUpload } from "../../utils/icons";
export const UploadZone = ({
  label,
  color,
  accent,
  uploading,
  onChange,
}: {
  label: string;
  color: string;
  accent: string;
  uploading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        const dt = e.dataTransfer.files;
        if (dt.length && inputRef.current) {
          const fake = { target: { files: dt } } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(fake);
        }
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        flex: 1,
        minHeight: 140,
        borderRadius: 14,
        border: `2px dashed ${dragging ? color : accent}`,
        background: dragging ? `${color}10` : "var(--card-bg, #16181f)",
        cursor: uploading ? "not-allowed" : "pointer",
        opacity: uploading ? 0.6 : 1,
        transition: "all 0.2s ease",
        padding: "1.5rem",
        boxSizing: "border-box",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: "50%",
        background: `${color}18`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: color,
      }}>
        <IconUpload />
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color }}>
          {uploading ? "Uploading..." : label}
        </div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 3 }}>
          Click or drag & drop
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        disabled={uploading}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </label>
  );
};