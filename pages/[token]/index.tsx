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
import { loadProgressBar } from 'axios-progress-bar';

import Downloader from 'js-file-downloader';
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
}

interface IMandeCoisas {
  files: IFiles[];
  transfer: ITransfer;
}

interface ICheckedItems {
  number;
  boolean;
}

const Index = () => {
  loadProgressBar({}, api);
  const [mandeCoisas, setMandeCoisas] = useState<IMandeCoisas>(null);
  const [checkedFiles, setCheckedFiles] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isFilesLoading, setIsFilesLoading] = useState(false);
  const toast = useToast();

  const router = useRouter();

  useEffect(() => {
    const fetchFiles = async () => {
      const { token } = router.query;
      if (token) {
        const { data } = await api.get<IMandeCoisas>(`/${token}`);
        setMandeCoisas(data);
        setIsPageLoading(false);
      }
    };

    fetchFiles();
  }, [router.query.token]);

  useEffect(() => {
    const map = mandeCoisas?.files.map((file) => file.id);
    setCheckedFiles(map);
  }, [mandeCoisas]);

  const receber = async () => {
    try {
      setIsFilesLoading(true);

      const promises = checkedFiles.map(async (file) => {
        const { original_name, mimetype } = mandeCoisas.files.find(
          (mnd) => mnd.id === file
        );

        const { data } = await api.get(`/${file}`, { responseType: 'blob' });
        const blob = new Blob([data], { type: mimetype });
        const URL = window.URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.href = URL;
        tempLink.setAttribute('download', original_name);
        tempLink.click();

        return true;
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
    if (checkedFiles.includes(value)) {
      setCheckedFiles(checkedFiles.filter((file) => file !== value));
    } else {
      setCheckedFiles([...checkedFiles, value]);
    }
  };

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

  return (
    <DefaultLayout>
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
                    leftIcon="download"
                    variant="ghost"
                    color="white"
                    size="lg"
                    bg="pink.500"
                    my={2}
                    onClick={receber}
                    _hover={{ bg: 'pink.600' }}>
                    Receber selecionados
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

export default Index;
