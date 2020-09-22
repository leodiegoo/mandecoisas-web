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
import { AiFillCamera as CameraIcon } from 'react-icons/ai';

import { useDropzone } from 'react-dropzone';
import QRCode from 'qrcode.react';

import api from '../config/api';

interface IMandeCoisas {
  type_id: string;
  id: string | number;
  size: number;
  total_files: number;
  expires_in: Date;
}

const Index = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [mandeCoisas, setMandeCoisas] = useState<IMandeCoisas>(null);
  const [isDropDesabilitado, setDropDesabilitado] = useState<boolean>(false);

  const { getRootProps, getInputProps, open: openDropzoneDialog } = useDropzone(
    {
      noClick: isDropDesabilitado,
      noKeyboard: isDropDesabilitado,
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
    setDropDesabilitado(true);
  };

  const sendFiles = async (typeid: string) => {
    try {
      const data = new FormData();
      data.append('type_id', typeid);
      files.forEach((file) => {
        data.append('files', file);
      });
      const {
        data: { id, type_id, size, total_files, expires_in }
      } = await api.post(`/file`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMandeCoisas({
        id,
        type_id,
        size,
        total_files,
        expires_in: new Date(expires_in.split('.')[0])
      });
      setFiles([]);
      setDropDesabilitado(true);
    } catch (error) {
      console.error(error);
    }
  };

  const limparDados = () => {
    setMandeCoisas(null);
    setFiles([]);
    setDropDesabilitado(false);
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
            {mandeCoisas ? 'Finalizado!' : 'Enviar'}
          </Text>
          <Grid templateColumns="1fr">
            {!!files.length && !mandeCoisas ? (
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
              <>
                {mandeCoisas ? (
                  <Flex
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center">
                    <Flex my={1}>
                      <QRCode value={` http://mndc.now.sh/${mandeCoisas.id}`} />
                    </Flex>
                    <Button
                      variantColor="purple"
                      my={1}
                      leftIcon="copy"
                      variant="ghost">
                      <Text fontWeight="normal" color="gray.500">
                        http://mndc.now.sh/
                      </Text>
                      <Text>{mandeCoisas.id}</Text>
                    </Button>
                    <Text my={1} fontWeight="normal" color="gray.500">
                      Expira às{' '}
                      {`${mandeCoisas.expires_in.getHours()}:${mandeCoisas.expires_in.getMinutes()}`}
                    </Text>
                    <Flex
                      alignSelf="stretch"
                      justifyContent="space-between"
                      flexDir="row"
                      my={1}>
                      <Text
                        justifySelf="flex-start"
                        alignSelf="baseline"
                        fontWeight="normal"
                        color="gray.500">
                        Total {mandeCoisas.total_files} arquivos •{' '}
                        {niceBytes(mandeCoisas.size)}
                      </Text>
                      <Button
                        justifySelf="flex-end"
                        alignSelf="baseline"
                        leftIcon="check"
                        variantColor="green"
                        onClick={() => limparDados()}>
                        <Text>OK</Text>
                      </Button>
                    </Flex>
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
              </>
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
                icon={CameraIcon}
                borderRadius="sm"
                bg="pink.500"
                _hover={{ bg: 'pink.600' }}
              />
              <IconButton
                h="1.75rem"
                aria-label="Baixar"
                size="sm"
                icon="download"
                borderRadius="sm"
                bg="pink.500"
                mx={1}
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
