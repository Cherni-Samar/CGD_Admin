import { useState } from "react";
import type { GalleryImg } from "../../types/gallery";
import { IconClose, IconTrash } from "../../utils/icons";

export const PreviewModal = ({ img, onClose }: { img: GalleryImg; onClose: () => void }) => (
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
export const EditModal = ({
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
export const DeleteModal = ({
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
