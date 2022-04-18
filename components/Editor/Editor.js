import { useState } from "react";
import Canvas from "../Canvas/Canvas";
import styles from "./Editor.module.scss";

const Editor = () => {
  const [download, setDownload] = useState(false);

  const draw = (ctx) => {
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20, 0, 2 * Math.PI);
    ctx.fill();
  };

  const downloadHandler = () => {
    setDownload(true);
    setTimeout(() => {
      setDownload(false);
    }, 10);
  };
  return (
    <div className={styles.editor}>
      <Canvas
        draw={draw}
        width={200}
        height={200}
        test={download ? "download" : ""}
      />
      <button onClick={downloadHandler}>Download</button>
      <input type="file" />
    </div>
  );
};

export default Editor;
