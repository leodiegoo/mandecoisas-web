import { Flex, Grid, Text } from '@chakra-ui/core';

const Index = () => (
  <Grid
    as="main"
    height="100vh"
    templateColumns="1fr"
    templateRows="100px auto"
    templateAreas="
      'header'
      'content'
    "
    justifyContent="center"
    alignItems="center">
    <Flex gridArea="header" flexDir="column" alignItems="flex-start">
      <Text fontSize="6xl">Mande Coisas =)</Text>
    </Flex>
    <Flex
      gridArea="content"
      flexDir="column"
      height="100%"
      alignItems="flex-start">
      <Text fontSize="6xl">Conteúdozada</Text>
    </Flex>
  </Grid>
);

export default Index;
