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
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.75)",
          fontWeight: 800,
          fontSize: 12,
          letterSpacing: "0.12em",
          padding: "5px 16px",
          borderRadius: 20,
          backdropFilter: "blur(6px)",
          display: "flex",
          gap: 10,
        }}
      >
        <span style={{ color: "#e85d3a" }}>BEFORE</span>
        <span style={{ opacity: 0.5 }}>|</span>
        <span style={{ color: "#1FD8C8" }}>AFTER</span>
      </div>
    </div>
  </div>
);


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
