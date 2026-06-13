export const createCollage = (before: File, after: File): Promise<File> => {
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