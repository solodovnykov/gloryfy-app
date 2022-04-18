import { useRef, useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import styles from "./Canvas.module.scss";

const Canvas = () => {
  const [acceptedFiles, setAcceptedFiles] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [originalImageFile, setOriginalImageFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [mergedImage, seMergedImage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      if (acceptedFiles) {
        let img = new Image();
        img.src = originalImageFile;
        const node = document.getElementById("image");
        htmlToImage
          .toPng(node, { canvasWidth: 500, canvasHeight: 500 })
          .then((dataUrl) => {
            seMergedImage(dataUrl);
          });
        console.log(mergedImage);
      }
    }, 160);
  }, [originalImage, acceptedFiles, originalImageFile, mergedImage]);

  useEffect(() => {
    setOriginalImage(acceptedFiles);
    if (acceptedFiles) {
      setOriginalImageFile(URL.createObjectURL(acceptedFiles));
      setFileName(acceptedFiles.name);
    }
  }, [acceptedFiles]);

  const uploadHandler = (e) => {
    setAcceptedFiles(e.target.files[0]);
  };

  return (
    <div className={styles.editor}>
      <div className={styles.image}>
        {originalImageFile ? (
          <div
            id="image"
            className={styles.originalImage}
            style={{ backgroundImage: `url(${originalImageFile})` }}>
            <div className={styles.circle}></div>
          </div>
        ) : (
          <div className={styles.originalImage}></div>
        )}
      </div>

      <input onChange={uploadHandler} name="file" type="file" />

      {mergedImage ? (
        <a href={mergedImage} download={fileName}>
          Download
        </a>
      ) : (
        ""
      )}
    </div>
  );
};

export default Canvas;
