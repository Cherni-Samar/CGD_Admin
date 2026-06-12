import React, { useEffect, useState, useRef } from "react";
import "./Dashboard.css";

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
type Theme = "dark" | "light";

interface GalleryImg {
  _id?: string;
  url: string;
  filename?: string;
  type?: "before" | "after";
}

// ─────────────────────────────────────────────
//  SVG ICONS
// ─────────────────────────────────────────────
const IconGrid = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
    <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5l1.5 3.2L12 5.2l-2.5 2.4.6 3.4L7 9.4l-3.1 1.6.6-3.4L2 5.2l3.5-.5L7 1.5z"
      stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
);
const IconCar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 8l1.5-3.5h7L12 8v2.5H2V8z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    <circle cx="4" cy="10.5" r="1" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="10" cy="10.5" r="1" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);
const IconCog = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.3" />
    <path d="M7 1.5v1M7 11.5v1M1.5 7h1M11.5 7h1M3.2 3.2l.7.7M10.1 10.1l.7.7M3.2 10.8l.7-.7M10.1 3.9l.7-.7"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.5 2H3a1 1 0 00-1 1v8a1 1 0 001 1h2.5M9.5 10l2.5-3-2.5-3M12 7H5.5"
      stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M2.5 4.5h10M6 4.5V3h3v1.5M5.5 4.5v7a.5.5 0 00.5.5h3a.5.5 0 00.5-.5v-7"
      stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconEdit = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M10.5 2.5l2 2L5 12H3v-2l7.5-7.5z" stroke="currentColor" strokeWidth="1.4"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconEye = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M1.5 7.5C1.5 7.5 4 3 7.5 3s6 4.5 6 4.5-2.5 4.5-6 4.5-6-4.5-6-4.5z"
      stroke="currentColor" strokeWidth="1.4" />
    <circle cx="7.5" cy="7.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const IconUpload = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 14V4M7 8l4-4 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 16v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);
const IconRefresh = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
    <path d="M13 7.5A5.5 5.5 0 112.5 5.5M2.5 2v3.5H6"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ─────────────────────────────────────────────
//  THEME TOGGLE
// ─────────────────────────────────────────────
const ThemeToggle = ({ theme, toggle }: { theme: Theme; toggle: () => void }) => (
  <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
    <div className="theme-toggle-thumb" />
  </button>
);

// ─────────────────────────────────────────────
//  SIDEBAR
// ─────────────────────────────────────────────
const logout = () => {
  localStorage.clear();
  window.location.href = "/login";
};

const Sidebar = ({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) => (
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
        <ThemeToggle theme={theme} toggle={toggleTheme} />
      </div>
      <button className="nav-item nav-item-logout" onClick={logout}>
        <IconLogout /> Logout
      </button>
    </div>
  </div>
);

// ─────────────────────────────────────────────
//  UPLOAD ZONE COMPONENT
// ─────────────────────────────────────────────

const createCollage = (before: File, after: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return reject("Canvas not supported");

    const beforeImg = new Image();
    const afterImg = new Image();

    beforeImg.src = URL.createObjectURL(before);
    afterImg.src = URL.createObjectURL(after);

    let loaded = 0;

    const onLoad = () => {
      loaded++;
      if (loaded < 2) return;

      // 🎯 canvas size
      canvas.width = beforeImg.width + afterImg.width;
      canvas.height = Math.max(beforeImg.height, afterImg.height);

      // =========================
      // LEFT IMAGE (BEFORE)
      // =========================
      ctx.drawImage(beforeImg, 0, 0);

      // STYLE TEXT
      ctx.font = "bold 28px Arial";
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;

      // background label
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(10, 10, 160, 40);

      // text
      ctx.fillStyle = "white";
      ctx.strokeText("BEFORE", 20, 40);
      ctx.fillText("BEFORE", 20, 40);

      // =========================
      // RIGHT IMAGE (AFTER)
      // =========================
      const offsetX = beforeImg.width;

      ctx.drawImage(afterImg, offsetX, 0);

      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(offsetX + 10, 10, 160, 40);

      ctx.fillStyle = "white";
      ctx.strokeText("AFTER", offsetX + 20, 40);
      ctx.fillText("AFTER", offsetX + 20, 40);

      // =========================
      // SEPARATOR LINE
      // =========================
      ctx.beginPath();
      ctx.moveTo(beforeImg.width, 0);
      ctx.lineTo(beforeImg.width, canvas.height);

      ctx.strokeStyle = "white";
      ctx.lineWidth = 4;
      ctx.stroke();

      // =========================
      // EXPORT IMAGE
      // =========================
      canvas.toBlob((blob) => {
        if (!blob) return reject("Canvas empty");

        const file = new File(
          [blob],
          `collage-${Date.now()}.jpg`,
          { type: "image/jpeg" }
        );

        resolve(file);
      }, "image/jpeg", 0.95);
    };

    beforeImg.onload = onLoad;
    afterImg.onload = onLoad;
  });
};
const UploadZone = ({
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

// ─────────────────────────────────────────────
//  IMAGE CARD
// ─────────────────────────────────────────────
const ImageCard = ({
  img,
  onDelete,
  onEdit,
  onPreview,
}: {
  img: GalleryImg;
  onDelete: (img: GalleryImg) => void;
  onEdit: (img: GalleryImg) => void;
  onPreview: (img: GalleryImg) => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        aspectRatio: "4/3",
        background: "#1a1d26",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.35)"
          : "0 2px 12px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
        cursor: "pointer",
      }}
    >
      {/* Image */}
      <img
        src={`http://localhost:3001${img.url}`}
        alt={img.filename || img.type || "Gallery"}
        style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
      />



      {/* Hover overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.22s ease",
        pointerEvents: hovered ? "auto" : "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "12px",
        gap: 8,
      }}>
        {/* Filename */}
        {img.filename && (
          <div style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.65)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: 4,
          }}>
            {img.filename}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 7 }}>
          <ActionBtn
            label="Preview"
            icon={<IconEye />}
            color="#ffffff"
            bg="rgba(255,255,255,0.15)"
            hoverBg="rgba(255,255,255,0.28)"
            onClick={() => onPreview(img)}
          />
          <ActionBtn
            label="Edit"
            icon={<IconEdit />}
            color="#1FD8C8"
            bg="rgba(31,216,200,0.15)"
            hoverBg="rgba(31,216,200,0.28)"
            onClick={() => onEdit(img)}
          />
          <ActionBtn
            label="Delete"
            icon={<IconTrash />}
            color="#ff5c5c"
            bg="rgba(255,92,92,0.15)"
            hoverBg="rgba(255,92,92,0.28)"
            onClick={() => onDelete(img)}
          />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  ACTION BUTTON (micro)
// ─────────────────────────────────────────────
const ActionBtn = ({
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

// ─────────────────────────────────────────────
//  MODAL: PREVIEW
// ─────────────────────────────────────────────
const PreviewModal = ({ img, onClose }: { img: GalleryImg; onClose: () => void }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.88)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(8px)",
      animation: "fadeIn 0.18s ease",
    }}
  >
    <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "88vh" }}>
      <img
        src={`http://localhost:3001${img.url}`}
        alt={img.filename || "Preview"}
        style={{
          maxWidth: "90vw",
          maxHeight: "80vh",
          borderRadius: 14,
          boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
          display: "block",
        }}
      />
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: -14, right: -14,
          width: 34, height: 34, borderRadius: "50%",
          background: "#222",
          border: "2px solid #333",
          color: "#fff",
          cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <IconClose />
      </button>
      {img.type && (
        <div style={{
          position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.75)",
          color: img.type === "before" ? "#e85d3a" : "#1FD8C8",
          fontWeight: 800, fontSize: 12, letterSpacing: "0.12em",
          padding: "5px 16px", borderRadius: 20,
          backdropFilter: "blur(6px)",
        }}>
          {img.type.toUpperCase()}
        </div>
      )}
    </div>
  </div>
);

// ─────────────────────────────────────────────
//  MODAL: EDIT / DELETE CONFIRM
// ─────────────────────────────────────────────
const EditModal = ({
  img,
  onClose,
  onSave,
}: {
  img: GalleryImg;
  onClose: () => void;
  onSave: (img: GalleryImg, newType: "before" | "after") => void;
}) => {
  const [selected, setSelected] = useState<"before" | "after">(img.type || "before");

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--card-bg, #1a1d26)",
          border: "1px solid #ffffff14",
          borderRadius: 16,
          padding: "28px 32px",
          width: 360,
          boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>Edit Photo</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 20 }}>
          {img.filename || img.url}
        </div>

        {/* Preview thumb */}
        <img
          src={`http://localhost:3001${img.url}`}
          alt="thumb"
          style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 10, marginBottom: 20 }}
        />

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af", marginBottom: 10, letterSpacing: "0.06em" }}>
            PHOTO TYPE
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {(["before", "after"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelected(t)}
                style={{
                  flex: 1,
                  padding: "10px 0",
                  borderRadius: 9,
                  border: `2px solid ${selected === t
                    ? (t === "before" ? "#e85d3a" : "#1FD8C8")
                    : "#ffffff18"}`,
                  background: selected === t
                    ? (t === "before" ? "#e85d3a18" : "#1FD8C818")
                    : "transparent",
                  color: selected === t
                    ? (t === "before" ? "#e85d3a" : "#1FD8C8")
                    : "#9ca3af",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  letterSpacing: "0.06em",
                  transition: "all 0.15s",
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: "10px 0", borderRadius: 9,
              border: "1px solid #ffffff18", background: "transparent",
              color: "#9ca3af", fontWeight: 600, cursor: "pointer", fontSize: 13,
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(img, selected)}
            style={{
              flex: 2, padding: "10px 0", borderRadius: 9,
              border: "none", background: "#1FD8C8",
              color: "#0d1117", fontWeight: 700, cursor: "pointer", fontSize: 13,
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
//  DELETE CONFIRM MODAL
// ─────────────────────────────────────────────
const DeleteModal = ({
  img,
  onClose,
  onConfirm,
}: {
  img: GalleryImg;
  onClose: () => void;
  onConfirm: (img: GalleryImg) => void;
}) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.75)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(6px)",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: "var(--card-bg, #1a1d26)",
        border: "1px solid #ff5c5c22",
        borderRadius: 16,
        padding: "28px 32px",
        width: 340,
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
        textAlign: "center",
      }}
    >
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: "#ff5c5c18",
        border: "2px solid #ff5c5c33",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px",
        color: "#ff5c5c",
      }}>
        <IconTrash />
      </div>
      <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>Delete Photo?</div>
      <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
        This action cannot be undone. The photo will be permanently removed from the gallery.
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button
          onClick={onClose}
          style={{
            flex: 1, padding: "10px 0", borderRadius: 9,
            border: "1px solid #ffffff18", background: "transparent",
            color: "#9ca3af", fontWeight: 600, cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onConfirm(img)}
          style={{
            flex: 1, padding: "10px 0", borderRadius: 9,
            border: "none", background: "#ff5c5c",
            color: "#fff", fontWeight: 700, cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────
//  SECTION HEADER
// ─────────────────────────────────────────────
const SectionHeader = ({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: string;
}) => (
  <div style={{
    display: "flex", alignItems: "center", gap: 12, marginBottom: 18,
  }}>
    <div style={{
      width: 4, height: 22, borderRadius: 4,
      background: color,
      flexShrink: 0,
    }} />
    <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "0.06em" }}>
      {label}
    </span>
    <span style={{
      background: `${color}20`,
      color,
      border: `1px solid ${color}40`,
      fontSize: 11,
      fontWeight: 700,
      padding: "2px 9px",
      borderRadius: 20,
    }}>
      {count} photo{count !== 1 ? "s" : ""}
    </span>
  </div>
);

// ─────────────────────────────────────────────
//  EMPTY STATE
// ─────────────────────────────────────────────
const EmptyState = ({ label }: { label: string }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", gap: 10,
    padding: "40px 20px",
    border: "1.5px dashed #ffffff12",
    borderRadius: 12,
    color: "#3d4252",
    minHeight: 140,
  }}>
  </div>
);

// ─────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────
const API_URL = "http://localhost:3001/api";

const GalleryAdmin: React.FC = () => {
  const [images, setImages] = useState<GalleryImg[]>([]);
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewImg, setPreviewImg] = useState<GalleryImg | null>(null);
  const [editImg, setEditImg] = useState<GalleryImg | null>(null);
  const [deleteImg, setDeleteImg] = useState<GalleryImg | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [collagePreview, setCollagePreview] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingCollageFile, setPendingCollageFile] = useState<File | null>(null);


  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("cgd-theme") as "dark" | "light") || "dark"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cgd-theme", theme);
  }, [theme]);
  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // ── Toast
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  };

  // ── Fetch
  const fetchGallery = async () => {
    const res = await fetch(`${API_URL}/gallery`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt") || ""}` },
    });
    if (res.ok) {
      const data = await res.json();
      setImages(Array.isArray(data) ? data : []);
    }
  };
  useEffect(() => { fetchGallery(); }, []);


  // ── Upload
  const handleUploadPair = async () => {
    if (!beforeFile || !afterFile) return;

    try {
      setUploading(true);

      const collageFile = await createCollage(beforeFile, afterFile);

      // 🔥 Preview uniquement (PAS upload encore)
      const previewUrl = URL.createObjectURL(collageFile);
      setCollagePreview(previewUrl);

      setPendingCollageFile(collageFile);
      setShowConfirm(true); // 👈 ouvre confirm modal

    } catch (e) {
      showToast("Collage failed");
    } finally {
      setUploading(false);
    }
  };

  // -- confirm upload 
  const confirmUpload = async () => {
    if (!pendingCollageFile) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", pendingCollageFile);

      const res = await fetch(`${API_URL}/gallery/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

      await fetchGallery();

      // reset
      setBeforeFile(null);
      setAfterFile(null);
      setCollagePreview(null);
      setPendingCollageFile(null);
      setShowConfirm(false);

      showToast("Collage uploaded!");
    } catch {
      showToast("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // -- cancel upload 
  const cancelUpload = () => {
    setShowConfirm(false);
    setPendingCollageFile(null);
    setCollagePreview(null);
  };
  // ── Delete
  const handleDelete = async (img: GalleryImg) => {
    setDeleteImg(null);
    try {
      if (img._id) {
        await fetch(`${API_URL}/gallery/${img._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt") || ""}` },
        });
      }
      setImages((imgs) => imgs.filter((i) => i.url !== img.url));
      showToast("Photo deleted.");
    } catch {
      showToast("Error deleting photo.");
    }
  };

  // ── Edit (change type)
  const handleEditSave = async (img: GalleryImg, newType: "before" | "after") => {
    setEditImg(null);
    try {
      if (img._id) {
        await fetch(`${API_URL}/gallery/${img._id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ type: newType }),
        });
      }
      setImages((imgs) =>
        imgs.map((i) => (i.url === img.url ? { ...i, type: newType } : i))
      );
      showToast("Photo updated!");
    } catch {
      showToast("Error updating photo.");
    }
  };

  const beforeImages = images.filter((img) => img.type === "before");
  const afterImages = images.filter((img) => img.type === "after");
  const noTypeImages = images.filter((img) => !img.type);
  const pairedImages = beforeImages.map((before, index) => ({
    before,
    after: afterImages[index] || null,
  }));

  return (
    <div className="dash-container">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      <div className="dash-main">
        {/* ── Topbar */}
        <div className="dash-topbar">
          <div>
            <div className="topbar-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long", year: "numeric",
                month: "long", day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* ── Content */}
        <div className="dash-content" style={{ maxWidth: 1320, margin: "0 auto" }}>

          {/* ── Page header */}
          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap", gap: 12,
            margin: "24px 0 28px",
          }}>
            <div>
              <h2 style={{ margin: 0, fontWeight: 800, fontSize: 22, letterSpacing: "-0.01em" }}>
                Photo Gallery
              </h2>
              <p style={{ margin: "5px 0 0", color: "#6b7280", fontSize: 13 }}>
                Manage your before & after car detailing photos
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{
                padding: "5px 14px", borderRadius: 8,
                background: "#ffffff08", border: "1px solid #ffffff10",
                fontSize: 12, color: "#9ca3af",
              }}>
                {images.length} total photo{images.length !== 1 ? "s" : ""}
              </div>
              <button
                onClick={fetchGallery}
                title="Refresh"
                style={{
                  width: 36, height: 36, borderRadius: 8,
                  border: "1px solid #ffffff12",
                  background: "#ffffff08",
                  color: "#9ca3af",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.15s",
                }}
              >
                <IconRefresh />
              </button>
            </div>
          </div>

          {/* ── Upload Zones */}
          <div style={{
            display: "flex", gap: 16, marginBottom: 36, flexWrap: "wrap",
          }}>
            <div
              style={{
                display: "flex",
                gap: 16,
                marginBottom: 20,
                flexWrap: "wrap",
              }}
            >
             
              <UploadZone
                label={beforeFile ? beforeFile.name : "Select BEFORE"}
                color="#e85d3a"
                accent="#ffffff18"
                uploading={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setBeforeFile(file);
                  }
                }}
              />

              <UploadZone
                label={afterFile ? afterFile.name : "Select AFTER"}
                color="#1FD8C8"
                accent="#ffffff18"
                uploading={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAfterFile(file);
                  }
                }}
              />
            </div>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <button
                onClick={handleUploadPair}
                disabled={!beforeFile || !afterFile || uploading}
                style={{
                  padding: "12px 24px",
                  borderRadius: 10,
                  border: "none",
                  background: "#1FD8C8",
                  color: "#111",
                  fontWeight: 700,
                  cursor: "pointer",
                  opacity:
                    !beforeFile || !afterFile || uploading
                      ? 0.5
                      : 1,
                }}
              >
                {uploading
                  ? "Uploading..."
                  : "Add Before / After Pair"}
              </button>
            </div>
          </div>

          
          {/* ── Unsorted */}
          {noTypeImages.length > 0 && (
            <div style={{ marginTop: 44 }}>
              <SectionHeader label="UNSORTED" count={noTypeImages.length} color="#9ca3af" />
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "14px",
              }}>
                {noTypeImages.map((img, i) => (
                  <ImageCard
                    key={img.url + "none" + i}
                    img={img}
                    onDelete={setDeleteImg}
                    onEdit={setEditImg}
                    onPreview={setPreviewImg}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Modals */}
      {previewImg && <PreviewModal img={previewImg} onClose={() => setPreviewImg(null)} />}
      {editImg && (
        <EditModal
          img={editImg}
          onClose={() => setEditImg(null)}
          onSave={handleEditSave}
        />
      )}
      {deleteImg && (
        <DeleteModal
          img={deleteImg}
          onClose={() => setDeleteImg(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* ── Toast */}
      {toastMsg && (
        <div style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 2000,
          background: "#1a1d26",
          border: "1px solid #1FD8C830",
          color: "#e2e8f0",
          padding: "12px 20px",
          borderRadius: 10,
          fontSize: 13,
          fontWeight: 500,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          animation: "slideUp 0.2s ease",
        }}>
          {toastMsg}
        </div>
      )}

      {/* ── CSS animations */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      {showConfirm && collagePreview && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999
        }}>
          <div style={{
            background: "#1a1d26",
            padding: 20,
            borderRadius: 14,
            width: 520,
            textAlign: "center"
          }}>
            <h3 style={{ marginBottom: 12 }}>Confirm Upload</h3>

            {/* Preview */}
            <img
              src={collagePreview}
              style={{
                width: "100%",
                borderRadius: 10,
                marginBottom: 15
              }}
            />

            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={cancelUpload}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #444",
                  background: "transparent",
                  color: "#fff"
                }}
              >
                Cancel
              </button>

              <button
                onClick={confirmUpload}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  background: "#1FD8C8",
                  color: "#000",
                  fontWeight: 700,
                  border: "none"
                }}
              >
                Confirm Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default GalleryAdmin;