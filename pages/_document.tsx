import Document, {
  DocumentProps,
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';

class MyDocument extends Document<DocumentProps> {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="google-site-verification"
            content="BN8GEQPzJ5R83WbppxtZMo5PDWOYGEs_QctH8a1VSN8"
          />

          <meta
            property="og:image"
            content="https://mndc.now.sh/images/logo.png"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#222222"
          />
          <meta name="msapplication-TileColor" content="#222222" />
          <meta name="theme-color" content="#222222" />
          <meta
            name="keywords"
            content="Send Anywhere, File transfer, Send large files, email large files, File sharing, Share files online, Transfer files, Send large files free, wifi file transfer, transfer data, iOS, Android, Windows, macOS, Linux, Outlook add-in, Gmail, Chrome extension, Wifi direct, Cross platform"
          />
          <meta
            name="description"
            content="The easiest way to share files across all of your devices. Send files of any size and type, as many times as you want, all for free!"
          />
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
