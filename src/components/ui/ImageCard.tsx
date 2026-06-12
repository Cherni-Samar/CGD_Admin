import { useState } from "react";
import type { GalleryImg } from "../../types/gallery";
import { IconEdit, IconEye, IconTrash } from "../../utils/icons";
import  { ActionBtn } from "../../utils/ActionBtn";
 

export const ImageCard = ({
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
