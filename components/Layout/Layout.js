import styles from "./Layout.module.scss";
import Head from "next/head";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="container-global">
      <div className={styles.glass1} />

      <div className={styles.glass2} />
      <div className={styles.layout}>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="container">
          <Header />

          {children}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
