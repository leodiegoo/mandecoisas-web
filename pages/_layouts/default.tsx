import Head from 'next/head';
import { Grid } from '@chakra-ui/core';
import Header from '../_includes/header';

interface IDefaultLayoutProps {
  title?: string;
  description?: string;
}
 
const DefaultLayout: React.FC<IDefaultLayoutProps> = ({
  title = '',
  children,
  description = ''
}) => (
  <main>
    <Head>
      <title>Mande Coisas {title}</title>

      <meta name="title" content={`Mande Coisas ${title}`} />
      <meta name="description" content={description} />

      <meta property="og:site_name" content="Mande Coisas" />
      <meta property="og:title" content={`Mande Coisas ${title}`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://mndc.now.sh/images/logo.png" />

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

      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>

    <Grid
      as="main"
      height="100vh"
      templateColumns="1fr"
      templateRows="15% auto"
      templateAreas="
      'header'
      'content'
    "
      justifyContent="center"
      alignItems="center">
      <Header />
      {children}
    </Grid>
  </main>
);

export default DefaultLayout;
