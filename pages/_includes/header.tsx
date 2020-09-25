import { Flex, Image } from '@chakra-ui/core';
import Link from 'next/link';

const Header = () => {
  return (
    <Flex
      gridArea="header"
      flexDir="column"
      alignItems="center"
      alignSelf="stretch"
      padding={2}>
      <Link href="/">
        <Image cursor="pointer" src="/images/logo.svg" height="100%" />
      </Link>
    </Flex>
  );
};

export default Header;
