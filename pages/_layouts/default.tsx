import Head from 'next/head';
import { Grid } from '@chakra-ui/core';
import Header from '../_includes/header';

interface IDefaultLayoutProps {
  title?: string;
}

const DefaultLayout: React.FC<IDefaultLayoutProps> = ({ title, children }) => (
  <main>
    <Head>
      <title>Mande Coisas {title}</title>

      <meta property="og:site_name" content="Mande Coisas" />

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
