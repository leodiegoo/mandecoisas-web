import { useState, useEffect } from 'react';

import {
  Flex,
  Grid,
  Text,
  Box,
  Badge,
  Button,
  CheckboxGroup,
  Checkbox,
  CircularProgress,
  useToast
} from '@chakra-ui/core';

import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { loadProgressBar } from 'axios-progress-bar';

import FileSaver from 'file-saver';
import api from '../../config/api';
import DefaultLayout from '../_layouts/default';

interface ITransfer {
  datetime: Date;
  expires_in: Date;
  size: number;
  total_files: number;
  type_id: string;
  id?: string;
  expired: boolean;
}

interface IFiles {
  id?: string;
  field_name: string;
  original_name: string;
  encoding: string;
  mimetype: string;
  path: string;
  file_name: string;
  id_transfer: string;
  size: number;
  expired: boolean;
}

interface IMandeCoisas {
  files: IFiles[];
  transfer: ITransfer;
}

const Index = ({ ...mandeCoisas }: IMandeCoisas) => {
  const [uncheckedFiles, setUncheckedFiles] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  const toast = useToast();
  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <Grid
        gridArea="content"
        flexDir="column"
        alignSelf="stretch"
        alignItems="flex-start"
        gridTemplateColumns={['1fr']}
        padding={2}>
        <CircularProgress
          isIndeterminate
          size="lg"
          alignSelf="center"
          justifySelf="center"
          my={10}
          color="purple"
        />
      </Grid>
    );
  }

  const receber = async () => {
    try {
      loadProgressBar({}, api);
      setIsFilesLoading(true);

      let filesToDownload = [];
      if (uncheckedFiles.length > 0) {
        filesToDownload = mandeCoisas.files.filter((file) => {
          const exist = uncheckedFiles.find(
            (uncheckedFile) => file.id === uncheckedFile
          );
          return !exist;
        });
      } else {
        filesToDownload = mandeCoisas.files;
      }

      const promises = filesToDownload.map(async (file: IFiles) => {
        const { mimetype, original_name } = file;

        const { data } = await api.get(`/${file.id}`, { responseType: 'blob' });
        const blob = new Blob([data], { type: mimetype });
        return FileSaver.saveAs(blob, original_name);
      });

      await Promise.all(promises);

      setIsFilesLoading(false);
    } catch (error) {
      setIsFilesLoading(false);
      toast({
        title: 'Oops, tivemos um problema!',
        description:
          'Estamos passando por instabilidades, por favor tente novamente mais tarde.',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      console.error(error);
    }
  };

  const handleCheckbox = (value) => {
    if (uncheckedFiles.includes(value)) {
      setUncheckedFiles(uncheckedFiles.filter((file) => file !== value));
    } else {
      setUncheckedFiles([...uncheckedFiles, value]);
    }
  };

  const niceBytes = (x) => {
    if (!x) return x;
    const [bytes] = x.toString().split(' ');
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0;
    let n = parseInt(bytes, 10) || 0;
    while (n >= 1024 && ++l) {
      n /= 1024;
    }
    return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
  };

  return (
    <DefaultLayout
      title={
        mandeCoisas
          ? `@ ${mandeCoisas?.transfer?.total_files} arquivos • ${niceBytes(
              mandeCoisas?.transfer?.size
            )}`
          : ''
      }
      description={
        mandeCoisas
          ? `${mandeCoisas?.transfer?.total_files} arquivos • ${niceBytes(
              mandeCoisas?.transfer?.size
            )}`
          : ''
      }>
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
            Arquivos
          </Text>
          <Grid templateColumns="1fr">
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              alignItems="space-between">
              {isPageLoading ? (
                <CircularProgress
                  isIndeterminate
                  size="lg"
                  alignSelf="center"
                  justifySelf="center"
                  my={10}
                  color="purple"
                />
              ) : (
                <>
                  <Box
                    bg="gray.600"
                    boxShadow="sm"
                    alignSelf="stretch"
                    p={2}
                    my={5}>
                    <CheckboxGroup variantColor="green">
                      {mandeCoisas?.files.map((file) => (
                        <Checkbox
                          defaultIsChecked
                          onChangeCapture={(e: any) =>
                            handleCheckbox(e.target.value)
                          }
                          value={file.id}
                          key={file.id}>
                          <Badge
                            fontSize="xs"
                            letterSpacing="3px"
                            variantColor="purple"
                            style={{ whiteSpace: 'normal' }}
                            wordBreak="break-word"
                            variant="subtle">
                            {file.original_name}
                          </Badge>{' '}
                          <Badge
                            fontSize="xs"
                            letterSpacing="3px"
                            variantColor="yellow"
                            wordBreak="break-all"
                            variant="subtle">
                            {niceBytes(file.size)}
                          </Badge>
                        </Checkbox>
                      ))}
                    </CheckboxGroup>
                  </Box>

                  <Button
                    isLoading={isFilesLoading}
                    alignSelf="flex-end"
                    width="100%"
                    leftIcon={
                      mandeCoisas?.transfer?.expired
                        ? 'not-allowed'
                        : 'download'
                    }
                    variant="ghost"
                    color="white"
                    size="lg"
                    bg="pink.500"
                    my={2}
                    onClick={receber}
                    isDisabled={mandeCoisas?.transfer?.expired}
                    _hover={{ bg: 'pink.600' }}>
                    {mandeCoisas?.transfer?.expired
                      ? 'Expirado'
                      : 'Receber selecionados'}
                  </Button>
                </>
              )}
            </Flex>
          </Grid>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { token } = context.params;
  const { data } = await api.get<IMandeCoisas>(`/${token}`);

  return {
    props: {
      ...data
    },
    revalidate: false
  };
};

export default Index;
