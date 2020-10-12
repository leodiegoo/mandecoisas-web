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
