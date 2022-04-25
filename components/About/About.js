import styles from "./About.module.scss";
import { useIntl } from "react-intl";

const About = () => {
  const { formatMessage: f } = useIntl();

  return (
    <div className={styles.about}>
      <h1 className={styles.title}>Stop War</h1>
      <p className={styles.description}>{f({ id: "about" })}</p>
    </div>
  );
};

export default About;
