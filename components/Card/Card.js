import { useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import styles from "./Card.module.scss";
import ImageNext from "next/image";
import { useIntl } from "react-intl";

const Card = () => {
  const { formatMessage: f } = useIntl();
  const [acceptedFiles, setAcceptedFiles] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const [originalImageFile, setOriginalImageFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
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
        shadow:
          "inset 0px -4px 10px rgba(250, 255, 0, 0.2), inset 0px 4px 10px rgba(0, 117, 255, 0.2)",
      },
      {
        id: 2,
        src: "flagUPA.svg",
        gradient: "",
        shadow:
          "inset 0px -4px 10px rgba(0, 0, 0, 0.2), inset 0px 4px 10px rgba(242, 0, 0, 0.2)",
      },
      {
        id: 3,
        src: "flagUAandUPA.svg",
        gradient: "",
        shadow:
          "inset -4px -4px 10px rgba(250, 255, 0, 0.2), inset -4px 4px 10px rgba(0, 117, 255, 0.2), inset 4px 4px 10px rgba(242, 0, 0, 0.2), inset 4px -4px 10px rgba(0, 0, 0, 0.6)",
      },
      {
        id: 4,
        src: "",
        gradient: "linear-gradient(138.28deg, #0075FF -5.24%, #FAFF00 98.12%)",
        shadow:
          "inset 4px 4px 10px rgba(0, 117, 255, 0.2), inset -4px -4px 10px rgba(250, 255, 0, 0.2)",
      },
    ],
  });

  const downloadHandler = () => {
    setDownload(!download);
    const downloadBtn = document.getElementById("downloadLink");
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
  }, [originalImage, acceptedFiles, originalImageFile, mergedImage, download]);

  useEffect(() => {
    setOriginalImage(acceptedFiles);
    if (acceptedFiles) {
      setOriginalImageFile(URL.createObjectURL(acceptedFiles));
      setFileName(acceptedFiles.name);
    }
  }, [acceptedFiles]);

  const uploadHandler = (e) => {
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    if (!allowedExtensions.exec(e.target.value)) {
      setFileError("Invalid file type");
    } else {
      setAcceptedFiles(e.target.files[0]);
      setFileError("");
    }
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
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div
          id="image"
          style={{
            backgroundImage: currentFlag[0].gradient
              ? currentFlag[0].gradient
              : `url('/icons/${currentFlag[0].src}')`,
          }}
          className={styles.head}>
          {noise ? <div className={styles.noise} /> : ""}

          <div className={styles.profileImageWrapper}>
            <div
              style={{
                boxShadow: glow ? currentFlag[0].shadow : "none",
              }}
              className={styles.profileShadow}
            />
            <div
              className={styles.profileImage}
              style={{
                backgroundImage: originalImageFile
                  ? `url(${originalImageFile})`
                  : "url('/images/profileDefaultImage.png')",
                transform: `scale(${scale / 100})`,
              }}></div>
          </div>
        </div>

        {fileError ? (
          <div className={styles.fileError}>{f({ id: "fileError" })}</div>
        ) : (
          ""
        )}

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
            value={f({ id: "uploadBtn" })}
            onClick={fileUploader}
            className={styles.uploadBtn}
          />

          <div className={styles.settings}>
            <div className={styles.settingsItem}>
              <div className={styles.settingsTitle}>{f({ id: "bg" })}</div>
              <div className={styles.settingsWrapper}>
                <div className={styles.switch}>
                  {flags.items.map((elements, index) =>
                    elements.gradient ? (
                      <div
                        style={{
                          background: elements.gradient,
                          opacity: flagStylesHandler(index),
                        }}
                        key={elements.id}
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
              <div className={styles.settingsTitle}>{f({ id: "glow" })}</div>
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
                  {f({ id: "yes" })}
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
                  {f({ id: "no" })}
                </button>
              </div>
            </div>

            <div className={styles.settingsItem}>
              <div className={styles.settingsTitle}>{f({ id: "noise" })}</div>
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
                  {f({ id: "yes" })}
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
                  {f({ id: "no" })}
                </button>
              </div>
            </div>

            <div className={styles.settingsItem}>
              <div className={styles.settingsTitle}>{f({ id: "scale" })}</div>
              <div className={styles.settingsWrapper}>
                <label className={styles.scaleValue} htmlFor="scale">
                  {scale} %
                </label>
                <input
                  className={styles.scaleSlider}
                  onChange={scaleHandler}
                  name="scale"
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
                {f({ id: "downloadBtn" })}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
