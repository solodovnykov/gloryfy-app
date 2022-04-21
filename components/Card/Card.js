import { useRef, useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import styles from "./Card.module.scss";
import ImageNext from "next/image";

const Card = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     const test = new Image();
  //     console.log(test);
  //   }, 1000);
  // });
  const [acceptedFiles, setAcceptedFiles] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [originalImageFile, setOriginalImageFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [mergedImage, seMergedImage] = useState("");
  const [glow, setGlow] = useState(false);
  const [noise, setNoise] = useState(false);
  const [scale, setScale] = useState(100);
  const [download, setDownload] = useState(false);
  const [flags, setFlags] = useState({
    activeFlag: { id: 1 },
    items: [
      {
        id: 1,
        src: "flagUA.svg",
        gradient: "",
      },
      {
        id: 2,
        src: "flagUPA.svg",
        gradient: "",
      },
      {
        id: 3,
        src: "flagUAandUPA.svg",
        gradient: "",
      },
      {
        id: 4,
        src: "",
        gradient: "linear-gradient(138.28deg, #0075FF -5.24%, #FAFF00 98.12%)",
      },
    ],
  });

  const downloadHandler = () => {
    setDownload(!download);
    const downloadBtn = document.getElementById("downloadLink");
    // downloadBtn.click();
    setTimeout(() => {
      downloadBtn.click();
    }, 400);
  };

  useEffect(() => {
    if (acceptedFiles) {
      let img = new Image();
      img.src = originalImageFile;
      const node = document.getElementById("image");
      htmlToImage
        .toPng(node, { canvasWidth: 500, canvasHeight: 500 })
        .then((dataUrl) => {
          seMergedImage(dataUrl);
        });
    }
  }, [
    originalImage,
    acceptedFiles,
    originalImageFile,
    mergedImage,
    flags,
    noise,
    download,
  ]);

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

  const fileUploader = () => {
    const file = document.getElementById("selectedFile");
    file.click();
  };

  const scaleHandler = (e) => {
    e.preventDefault();
    setScale(e.target.value);
  };

  const flagHandler = (item) => {
    setFlags({ ...flags, activeFlag: flags.items[item] });
    console.log(flags);
  };

  const flagStylesHandler = (item) => {
    if (flags.items[item].id === flags.activeFlag.id) {
      return "1";
    } else {
      return "0.3";
    }
  };

  const currentFlag = flags.items.filter((item) => {
    return item.id === flags.activeFlag.id;
  });

  return (
    <div className={styles.card}>
      <div
        style={{
          backgroundImage: currentFlag[0].gradient
            ? currentFlag[0].gradient
            : `url('/icons/${currentFlag[0].src}')`,
        }}
        className={styles.head}
        id="image">
        {/* {noise ? <div className={styles.noise} /> : ""} */}

        <div
          className={styles.noise}
          style={{
            opacity: noise ? "0.3" : "0",
          }}
        />

        <div
          className={styles.profileImage}
          style={{
            backgroundImage: originalImageFile
              ? `url(${originalImageFile})`
              : "",
            backgroundSize: `${scale}%`,
          }}></div>
      </div>

      <div className={styles.body}>
        <input
          onChange={uploadHandler}
          name="file"
          type="file"
          id="selectedFile"
          style={{ display: "none" }}
        />

        <input
          type="button"
          value="Upload"
          onClick={fileUploader}
          className={styles.uploadBtn}
        />

        <div className={styles.settings}>
          <div className={styles.settingsItem}>
            <div className={styles.settingsTitle}>Background</div>
            <div className={styles.settingsWrapper}>
              <div className={styles.switch}>
                {flags.items.map((elements, index) =>
                  elements.gradient ? (
                    <div
                      style={{
                        background: elements.gradient,
                        opacity: flagStylesHandler(index),
                      }}
                      className={styles.flagBtnGradient}
                      onClick={() => flagHandler(index)}
                    />
                  ) : (
                    <ImageNext
                      src={`/icons/${elements.src}`}
                      key={elements.id}
                      className={styles.flagBtn}
                      style={{
                        opacity: flagStylesHandler(index),
                      }}
                      width={26}
                      height={20}
                      objectFit="cover"
                      alt="Flag UA"
                      onClick={() => flagHandler(index)}
                    />
                  )
                )}
              </div>
            </div>
          </div>

          <div className={styles.settingsItem}>
            <div className={styles.settingsTitle}>Glow</div>
            <div className={styles.settingsWrapper}>
              <button
                onClick={() => {
                  setGlow(true);
                }}
                style={{
                  backgroundColor: glow ? "#2B99FF" : "#202124",
                  color: glow ? "#fff" : "#626265",
                }}
                className={styles.settingsBtn}>
                Yes
              </button>
              <button
                onClick={() => {
                  setGlow(false);
                }}
                style={{
                  backgroundColor: glow ? "#202124" : "#2B99FF",
                  color: glow ? "#626265" : "#fff",
                }}
                className={styles.settingsBtn}>
                No
              </button>
            </div>
          </div>

          <div className={styles.settingsItem}>
            <div className={styles.settingsTitle}>Noise</div>
            <div className={styles.settingsWrapper}>
              <button
                onClick={() => {
                  setNoise(true);
                }}
                style={{
                  backgroundColor: noise ? "#2B99FF" : "#202124",
                  color: noise ? "#fff" : "#626265",
                }}
                className={styles.settingsBtn}>
                Yes
              </button>
              <button
                onClick={() => {
                  setNoise(false);
                }}
                style={{
                  backgroundColor: noise ? "#202124" : "#2B99FF",
                  color: noise ? "#626265" : "#fff",
                }}
                className={styles.settingsBtn}>
                No
              </button>
            </div>
          </div>

          <div className={styles.settingsItem}>
            <div className={styles.settingsTitle}>Scale Image</div>
            <div className={styles.settingsWrapper}>
              <input
                value={`${scale}%`}
                type="text"
                className={styles.scaleValue}
              />
              <input
                className={styles.scaleSlider}
                onChange={scaleHandler}
                type="range"
                min="100"
                max="150"
                step="1"
              />
            </div>
          </div>
        </div>

        {mergedImage ? (
          <>
            <a
              style={{ display: "none" }}
              id="downloadLink"
              href={mergedImage}
              download={fileName}>
              Download
            </a>
            <div onClick={downloadHandler} className={styles.downloadBtn}>
              Download
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      {/* <input onChange={uploadHandler}  name="file" type="file" />

      {mergedImage ? (
        <a href={mergedImage} download={fileName}>
          Download
        </a>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Card;
