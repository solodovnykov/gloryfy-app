import styles from "../styles/NotFound.module.scss";
import Link from "next/link";

const Custom404 = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.wrapper}>
        <h1>404</h1>
        <h2>Page not found</h2>
        <Link href="/">
          <a>Go Home</a>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
