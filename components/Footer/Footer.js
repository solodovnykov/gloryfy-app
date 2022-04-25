import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <div className="container">
      <div className={styles.footer}>
        <p>Created by</p>
        <a
          rel="noreferrer"
          target="_blank"
          href="https://github.com/solodovnykov">
          Solodovnykov
        </a>
      </div>
    </div>
  );
};

export default Footer;
