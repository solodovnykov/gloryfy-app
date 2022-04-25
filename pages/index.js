import Head from "next/head";
import About from "../components/About/About";
import Card from "../components/Card/Card";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Gloryfy</title>
      </Head>

      <div className={styles.glass3} />
      <div className={styles.glass4} />

      <div className={styles.wrapper}>
        <Card />
        <About />
      </div>
    </>
  );
}
