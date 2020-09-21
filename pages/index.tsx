import { Flex, Grid, Image, Text, Box, Icon, Input } from '@chakra-ui/core';

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
        gridTemplateRows="1.5rem auto"
        padding={5}>
        <Text gridRow="1" fontSize="2xl">
          Enviar
        </Text>
        <Icon
          gridRow="2"
          name="add"
          size="3rem"
          alignSelf="center"
          justifySelf="center"
          color="pink.500"
        />
      </Grid>
      <Box
        height="125px"
        bg="gray.600"
        borderWidth="5px"
        borderStyle="dashed"
        borderColor="gray.600"
        padding={5}
        my={2}
        gridRow="sendContent-end"
        gridTemplateRows="1.5rem auto">
        <Text fontSize="2xl">Receber</Text>
        <Input
          placeholder="Insira o PIN e dê enter"
          height="50px"
          borderRadius="sm"
        />
      </Box>
    </Grid>
  </Grid>
);

export default Index;
