import React, { useState } from "react";
import "./Dashboard.css";

import { useGallery } from "../hooks/gallery/useGallery";

// components
import {UploadZone} from "../components/ui/UploadZone";
import {ImageCard} from "../components/ui/ImageCard";

// modals
import {
  PreviewModal,
  EditModal,
  DeleteModal,
} from "../components/ui/modals";

// utils
import { createCollage } from "../utils/collage";

type GalleryImg = {
  _id?: string;
  url: string;
  filename?: string;
  type?: "before" | "after";
};

const API_URL = "http://localhost:3001/api";

const GalleryAdmin: React.FC = () => {
  // ─────────────────────────────
  // HOOK DATA
  // ─────────────────────────────
  const { images, fetchGallery, deleteImage, updateImageType } =
    useGallery();

  // ─────────────────────────────
  // LOCAL STATE (UI ONLY)
  // ─────────────────────────────
  const [beforeFile, setBeforeFile] = useState<File | null>(null);
  const [afterFile, setAfterFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [previewImg, setPreviewImg] = useState<GalleryImg | null>(null);
  const [editImg, setEditImg] = useState<GalleryImg | null>(null);
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
      const formData = new FormData();
      formData.append("file", collageFile);

      const res = await fetch(`${API_URL}/gallery/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt") || ""}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error();

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
  // UPDATE TYPE
  // ─────────────────────────────
  const handleEditSave = async (
    img: GalleryImg,
    type: "before" | "after"
  ) => {
    try {
      if (img._id) {
        await updateImageType(img._id, type);
      }

      showToast("Updated");
      fetchGallery();
    } catch {
      showToast("Update error");
    }

    setEditImg(null);
  };

  // ─────────────────────────────
  // FILTERS
  // ─────────────────────────────
  const beforeImages = images.filter((i) => i.type === "before");
  const afterImages = images.filter((i) => i.type === "after");
  const unsorted = images.filter((i) => !i.type);

  return (
    <div className="dash-container">

      {/* ───────────────────────────── */}
      {/* HEADER */}
      {/* ───────────────────────────── */}
      <div className="dash-main">

        <div className="dash-content">

          <h2>Gallery Admin</h2>
          <p>Manage before & after car detailing images</p>

          {/* ───────────────────────────── */}
          {/* UPLOAD */}
          {/* ───────────────────────────── */}
          <div style={{ display: "flex", gap: 16 }}>
            <UploadZone
              label={beforeFile?.name || "Before"}
              color="#e85d3a"
              accent="#ffffff18"
              uploading={loading}
              onChange={(e) =>
                setBeforeFile(e.target.files?.[0] || null)
              }
            />

            <UploadZone
              label={afterFile?.name || "After"}
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
          >
            {loading ? "Processing..." : "Create Collage"}
          </button>

          {/* ───────────────────────────── */}
          {/* UNSORTED */}
          {/* ───────────────────────────── */}
          <div style={{ marginTop: 30 }}>
            <h3>Unsorted</h3>

            <div className="grid">
              {unsorted.map((img) => (
                <ImageCard
                  key={img.url}
                  img={img}
                  onPreview={setPreviewImg}
                  onEdit={setEditImg}
                  onDelete={setDeleteImg}
                />
              ))}
            </div>
          </div>

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

      {/* ───────────────────────────── */}
      {/* CONFIRM UPLOAD MODAL */}
      {/* ───────────────────────────── */}
      {showConfirm && collagePreview && (
        <div className="overlay">
          <div className="modal">

            <h3>Confirm Upload</h3>

            <img
              src={collagePreview}
              style={{ width: "100%", borderRadius: 10 }}
            />

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              <button onClick={cancelUpload}>Cancel</button>

              <button onClick={confirmUpload}>
                Confirm
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