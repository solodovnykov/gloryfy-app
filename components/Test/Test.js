import { useRef, useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import styles from "./Test.module.scss";

const Test = () => {
  useEffect(() => {
    const test = new Image();
    console.log(test);
  });

  return <div className={styles.editor}></div>;
};

export default Test;
