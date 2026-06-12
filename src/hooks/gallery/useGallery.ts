import { useEffect, useState } from "react";
import {
  getGallery,
  deleteImage,
  updateImageType,
  uploadGallery,
} from "../../services/api/galleryService";

export const useGallery = () => {
const [images, setImages] = useState<any[]>([]);
  const fetchGallery = async () => {
    const data = await getGallery();
    setImages(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return {
    images,
    setImages,
    fetchGallery,
    deleteImage,
    updateImageType,
    uploadGallery,
  };
};