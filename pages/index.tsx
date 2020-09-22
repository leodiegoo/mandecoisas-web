import { useState, createRef } from 'react';

import {
  Flex,
  Grid,
  Image,
  Text,
  Box,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  List,
  ListItem,
  Badge,
  Button
} from '@chakra-ui/core';

import { useDropzone } from 'react-dropzone';

import api from '../config/api';

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps, open: openDropzoneDialog } = useDropzone(
    {
      noClick: !!files.length,
      noKeyboard: !!files.length,
      onDrop: (e) => filesDrop(e)
    }
  );
  const dropzoneRef = createRef();

  const niceBytes = (x) => {
    const [bytes] = x.toString().split(' ');
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0;
    let n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) {
      n /= 1024;
    }
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
  };

  const filesDrop = (dropzoneFiles: File[]) => {
    const filesFiltered = dropzoneFiles.filter((drop) => {
      const { name } = drop;
      return !files.filter((file) => file.name === name).length;
    });
    setFiles([...files, ...filesFiltered]);
  };

  const sendFiles = async (type_id: string) => {
    const data = {
      files,
      type_id
    };
    // const response = await api.post(`/file`, data, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    console.log(process.env);
  };

  return (
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
          padding={5}
          {...getRootProps()}
          ref={dropzoneRef}
          cursor={!files.length ? 'pointer' : 'default'}>
          <input {...getInputProps()} />
          <Text gridRow="1" fontSize="2xl">
            Enviar
          </Text>
          <Grid templateColumns="1fr">
            {files.length ? (
              <Flex
                flexDirection="column"
                alignSelf="stretch"
                alignItems="stretch">
                <Box
                  bg="gray.600"
                  boxShadow="sm"
                  alignSelf="stretch"
                  p={2}
                  my={5}>
                  <List spacing={1} styleType="none">
                    {files.map((file) => (
                      <ListItem key={file.name}>
                        <Badge
                          fontSize="xs"
                          letterSpacing="3px"
                          variantColor="purple"
                          style={{ whiteSpace: 'normal' }}
                          wordBreak="break-word"
                          variant="subtle">
                          {file.name}
                        </Badge>{' '}
                        <Badge
                          fontSize="xs"
                          letterSpacing="3px"
                          variantColor="yellow"
                          wordBreak="break-all"
                          variant="subtle">
                          {niceBytes(file.size)}
                        </Badge>
                      </ListItem>
                    ))}
                  </List>
                  <IconButton
                    width="100%"
                    icon="add"
                    variant="ghost"
                    aria-label="adicionar mais itens"
                    color="white"
                    size="lg"
                    bg="pink.500"
                    my={2}
                    _hover={{ bg: 'pink.600' }}
                    onClick={openDropzoneDialog}
                  />
                </Box>

                <Box alignSelf="center" justifySelf="flex-start">
                  <Button borderRadius="sm" leftIcon="sun" isDisabled>
                    QRCode
                  </Button>{' '}
                  <Button
                    borderRadius="sm"
                    leftIcon="link"
                    onClick={() => sendFiles('string')}>
                    Link
                  </Button>{' '}
                  <Button
                    borderRadius="sm"
                    leftIcon="lock"
                    onClick={() => sendFiles('number')}>
                    PIN
                  </Button>
                </Box>
              </Flex>
            ) : (
              <Icon
                gridRow="2"
                name="add"
                size="3rem"
                alignSelf="flex-start"
                justifySelf="center"
                color="pink.500"
              />
            )}
          </Grid>
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
          <InputGroup size="md">
            <Input placeholder="Insira o PIN" borderRadius="sm" />
            <InputRightElement width="4.5rem">
              <IconButton
                h="1.75rem"
                aria-label="Baixar"
                size="sm"
                icon="download"
                borderRadius="sm"
                bg="pink.500"
                _hover={{ bg: 'pink.600' }}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Index;
