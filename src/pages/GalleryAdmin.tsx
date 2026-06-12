import React, { useState, useEffect } from "react";
import "./Dashboard.css";

import { useGallery } from "../hooks/gallery/useGallery";

// components
import { UploadZone } from "../components/ui/UploadZone";
import { ImageCard } from "../components/ui/ImageCard";
import { Sidebar } from "../components/layout/Sidebar";

// modals
import { PreviewModal, DeleteModal } from "../components/ui/modals";

// utils
import { createCollage } from "../utils/collage";
import type { GalleryImg } from "../types/gallery";

//services
import { getGallery, uploadGallery, deleteImage, } from "../services/api/galleryService";

const GalleryAdmin: React.FC = () => {

  const [theme, setTheme] = useState<"dark" | "light">(
    () => (localStorage.getItem("theme") as "dark" | "light") || "dark"
  );
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

  }, [theme]);


  // ─────────────────────────────
  // HOOK DATA
  // ─────────────────────────────
  const { images, fetchGallery, deleteImage } =
    useGallery();

  // ─────────────────────────────
  // LOCAL STATE (UI ONLY)
  // ─────────────────────────────
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [previewImg, setPreviewImg] = useState<GalleryImg | null>(null);
  const [deleteImg, setDeleteImg] = useState<GalleryImg | null>(null);

  const [collageFile, setCollageFile] = useState<File | null>(null);
  const [collagePreview, setCollagePreview] = useState<string | null>(null);

  const [showConfirm, setShowConfirm] = useState(false);

  const [toast, setToast] = useState<string | null>(null);

  // ─────────────────────────────
  // TOAST
  // ─────────────────────────────
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  // ─────────────────────────────
  // CREATE COLLAGE + PREVIEW
  // ─────────────────────────────
  const handleUpload = async () => {
    if (!beforeFile || !afterFile) return;

    setLoading(true);

    try {
      const file = await createCollage(beforeFile, afterFile);

      setCollageFile(file);
      setCollagePreview(URL.createObjectURL(file));
      setShowConfirm(true);
    } catch (err) {
      showToast("Error creating collage");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────
  // CONFIRM UPLOAD
  // ─────────────────────────────
  const confirmUpload = async () => {
    if (!collageFile) return;

    setLoading(true);

    try {
      await uploadGallery(collageFile);
      await fetchGallery();

      setBeforeFile(null);
      setAfterFile(null);
      setCollageFile(null);
      setCollagePreview(null);
      setShowConfirm(false);

      showToast("Upload successful!");
    } catch {
      showToast("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ─────────────────────────────
  // CANCEL UPLOAD
  // ─────────────────────────────
  const cancelUpload = () => {
    setShowConfirm(false);
    setCollageFile(null);
    setCollagePreview(null);
  };

  // ─────────────────────────────
  // DELETE IMAGE
  // ─────────────────────────────
  const handleDelete = async (img: GalleryImg) => {
    try {
      if (img._id) {
        await deleteImage(img._id);
      }

      showToast("Deleted");
      fetchGallery();
    } catch {
      showToast("Delete error");
    }

    setDeleteImg(null);
  };

  // ─────────────────────────────
  // FILTERS
  // ─────────────────────────────

const galleryImages = images;  
  return (
    <div className={`dash-container ${theme}`}>

      <Sidebar
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* ───────────────────────────── */}
      {/* HEADER */}
      {/* ───────────────────────────── */}
      <div className="dash-main">

        <div className="dash-content" style={{ maxWidth: 1320, margin: "0 auto" }}>

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              margin: "24px 0 28px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: "-0.01em",
                  color: "var(--text)"

                }}
              >
                Photo Gallery
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#6b7280",
                  fontSize: 13,
                }}
              >
                Manage your before & after car detailing photos
              </p>
            </div>

            <div
              style={{
                padding: "5px 14px",
                borderRadius: 8,
                background: "#ffffff08",
                border: "1px solid #ffffff10",
                fontSize: 12,
                color: "#9ca3af",
              }}
            >
              {images.length} total photo{images.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Upload Section */}
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 24,
            }}
          >
            <UploadZone
              label={beforeFile?.name || "+ Add BEFORE photo"}
              color="#e85d3a"
              accent="#ffffff18"
              uploading={loading}
              onChange={(e) =>
                setBeforeFile(e.target.files?.[0] || null)
              }
            />

            <UploadZone
              label={afterFile?.name || "+ Add AFTER photo"}
              color="#1FD8C8"
              accent="#ffffff18"
              uploading={loading}
              onChange={(e) =>
                setAfterFile(e.target.files?.[0] || null)
              }
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={!beforeFile || !afterFile || loading}
            style={{
              padding: "12px 20px",
              borderRadius: 10,
              border: "none",
              background: "#1FD8C8",
              color: "#000",
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 30,
            }}
          >
            {loading ? "Processing..." : "Create Collage"}
          </button>

          <div
            style={{
              height: 1,
              background: "#ffffff0a",
              marginBottom: 32,
            }}
          />

          {/* UNSORTED */}
          {galleryImages.length > 0 && (
            <div style={{ marginTop: 50 }}>
              <h3 style={{ color: "#9ca3af" }}>
                UNSORTED ({galleryImages.length})
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill,minmax(220px,1fr))",
                  gap: 14,
                }}
              >
                {galleryImages.map((img, i) => (
                  console.log("Rendering ImageCard with URL:", `http://localhost:3001${img.url}`),

                  <ImageCard
                    key={img.url + i}
                    img={img}
                    onPreview={setPreviewImg}
                    
                    onDelete={setDeleteImg}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ───────────────────────────── */}
      {/* MODALS */}
      {/* ───────────────────────────── */}
      {previewImg && (
        <PreviewModal
          img={previewImg}
          onClose={() => setPreviewImg(null)}
        />
      )}

      

      {deleteImg && (
        <DeleteModal
          img={deleteImg}
          onClose={() => setDeleteImg(null)}
          onConfirm={handleDelete}
        />
      )}

      {/* ───────────────────────────── */}
      {/* CONFIRM UPLOAD MODAL */}
      {/* ───────────────────────────── */}
      {showConfirm && collagePreview && (
        <div className="overlay">
          <div className="modal">

            {/* HEADER */}
            <div className="modal-header">
              <h3>Confirm Upload</h3>
              <p>Check your collage before uploading it</p>
            </div>

            {/* IMAGE */}
            <div className="modal-body">
              <img src={collagePreview} alt="collage preview" />
            </div>

            {/* ACTIONS */}
            <div className="modal-footer">
              <button
                className="btn btn-cancel"
                onClick={cancelUpload}
              >
                Cancel
              </button>

              <button
                className="btn btn-confirm"
                onClick={confirmUpload}
              >
                Upload
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ───────────────────────────── */}
      {/* TOAST */}
      {/* ───────────────────────────── */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
};

export default GalleryAdmin;

