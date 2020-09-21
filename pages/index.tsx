import { Flex, Grid, Image, Text, Box } from '@chakra-ui/core';

const Index = () => (
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
    <Flex
      gridArea="header"
      flexDir="column"
      alignItems="center"
      alignSelf="stretch"
      padding={2}>
      <Image src="/images/logo.svg" height="100%" />
    </Flex>
    <Grid
      gridArea="content"
      flexDir="column"
      alignSelf="stretch"
      alignItems="flex-start"
      gridTemplateRows="auto"
      gridTemplateColumns={['1fr', '1fr', '400px', '400px']}
      gridTemplateAreas="'sendContent'"
      padding={2}>
      <Grid
        borderWidth="5px"
        borderStyle="dashed"
        borderColor="gray.600"
        gridArea="sendContent"
        borderRadius="lg"
        gridColumn="1"
        alignSelf="stretch"
        padding={5}>
        <Text fontSize="2xl">Enviar</Text>
      </Grid>
      <Box
        height="125px"
        bg="gray.600"
        borderWidth="5px"
        borderStyle="dashed"
        borderColor="gray.600"
        padding={5}
        my={2}
        gridRow="sendContent-end">
        <Text fontSize="2xl">Receber</Text>
      </Box>
    </Grid>
  </Grid>
);

export default Index;
