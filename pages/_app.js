import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import "../styles/global.scss";
import Script from "next/script";

const messages = {
  en: {
    uploadBtn: "Upload",
    downloadBtn: "Download",
    bg: "Background",
    glow: "Glow",
    noise: "Noise",
    scale: "Scale",
    yes: "Yes",
    no: "No",
    fileError: "Invalid file type",
    about:
      "Help draw the attention of people around the world to the war in Ukraine. Help stop the Russian invaders. Glory to Ukraine!",
    help: "Support UA",
  },
  uk: {
    uploadBtn: "Додати",
    downloadBtn: "Завантажити",
    bg: "Фон",
    glow: "Підсвітка",
    noise: "Шум",
    scale: "Масштаб",
    yes: "Так",
    no: "Ні",
    fileError: "Невірний тип файлу",
    about:
      "Допоможи звернути увагу людей всього світу на війну в Україні. Допоможи зупинити російських загарбників. Слава Україні!",
    help: "Допомогти",
  },
};

function MyApp({ Component, pageProps }) {
  const { locale } = useRouter();

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}
      />

      <Script id="Google Analytics Script" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', ${process.env.GOOGLE_ANALYTICS_ID});
          `}
      </Script>

      <IntlProvider locale={locale} messages={messages[locale]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </>
  );
}

export default MyApp;
