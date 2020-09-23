import { Flex, Image } from '@chakra-ui/core';

const Header = () => {
  return (
    <Flex
      gridArea="header"
      flexDir="column"
      alignItems="center"
      alignSelf="stretch"
      padding={2}>
      <Image src="/images/logo.svg" height="100%" />
    </Flex>
  );
};

export default Header;
