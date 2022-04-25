import DropdownLang from "../DropdownLang/DropdownLang";
import styles from "./Header.module.scss";
import { useIntl } from "react-intl";

const Header = () => {
  const { formatMessage: f } = useIntl();
  return (
    <div className={styles.header}>
      <div className={styles.logo} />

      <div className={styles.rightWrapper}>
        <DropdownLang />
        <a
          className={styles.supportBtn}
          target="_blank"
          rel="noreferrer"
          href="https://bank.gov.ua/ua/news/all/natsionalniy-bank-vidkriv-spetsrahunok-dlya-zboru-koshtiv-na-potrebi-armiyi">
          {f({ id: "help" })}
        </a>
      </div>
    </div>
  );
};

export default Header;
