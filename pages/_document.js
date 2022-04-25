import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          {/* <link rel="manifest" href="/manifest.json" /> */}
          <meta
            name="description"
            content="Gloryfy — Simple app designed to create profile pictures with UA flag outlines."
          />
          <meta
            name="keywords"
            content="Image,  gloryfy, обводка вокруг фото, український флаг навколо фото, Україна, українскьий флаг, редактор фото"
          />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="reply-to" content="solodovnikov.toni@gmail.com" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0c0c0c" />
          <meta name="msapplication-TileColor" content="#0c0c0c" />
          <meta name="theme-color" content="#0c0c0c" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
