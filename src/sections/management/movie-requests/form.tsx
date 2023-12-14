'use client';

import FormProvider from '@/components/hook-form/form-provider';
import RHFInput from '@/components/hook-form/input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import RHFTextarea from '@/components/hook-form/textarea';
import {
  Button,
  DrawerFooter,
  DrawerBody,
  HStack,
  Text,
  VStack,
  Box,
  useToast,
} from '@chakra-ui/react';
import getCDNPath from '@/utils/get-cdn-path.util';
import UploadImage from '@/components/upload-image';
import { useEffect, useState } from 'react';
import RHFDropdown from '@/components/hook-form/dropdown';
import { capitalCase } from 'change-case';
import { movieSchema } from './movie.schema';
import RHFCombobox from '@/components/hook-form/combobox';
import { CountryData, all as allCountries } from 'country-codes-list';
import Iconify from '@/components/iconify';
import { MovieType } from '@/types/movie.type';
import { MOVIE_POSTER_RATIO } from '@/constants/movie-poster-ratio.constant';
import { MOVIE_BANNER_RATIO } from '@/constants/movie-banner-ratio.constant';
import { CertificationEnum } from '@/enums/certification.enum';
import RHFNumberInput from '@/components/hook-form/number-input';
import Genres from './genres';
import People from './people';
import AdderUser from './adder-user';
import MovieRequestsService from '@/services/movie-requests/movie-requests.service';
import { StatusEnum } from '@/enums/status.enum';

type Props = {
  movie: MovieType | null;
  onClose: () => void;
  refetch: () => void;
};

export default function MovieForm({ movie, refetch, onClose }: Props) {
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  console.log(movie);
  const methods = useForm<MovieType>({
    defaultValues: movie || {},
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(movieSchema) as any,
  });

  const { reset } = methods;

  const handleAccept = async () => {
    if (!movie) return;
    setLoading(true);

    const res = await MovieRequestsService.putMovieRequest(movie.id, {
      status: StatusEnum.ACTIVE,
    });

    if (res.success) {
      toast({
        title: 'Movie request accepted',
        status: 'success',
      });
      refetch();
      onClose();
    }
    setLoading(false);
  };

  const handleReject = async () => {
    if (!movie) return;
    setLoading(true);

    const res = await MovieRequestsService.putMovieRequest(movie.id, {
      status: StatusEnum.REJECTED,
    });

    if (res.success) {
      toast({
        title: 'Movie request rejected',
        status: 'success',
      });
      refetch();
      onClose();
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!movie) return;

    reset(movie);
  }, [movie, reset]);

  return (
    <FormProvider
      methods={methods}
      onSubmit={() => {}}
      style={{
        overflowY: 'auto',
      }}
    >
      <DrawerBody>
        <VStack alignItems="stretch">
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Banner Image
            </Text>
            <Box pointerEvents="none">
              <UploadImage
                src={
                  movie?.bannerPhotoFile?.path
                    ? getCDNPath(movie?.bannerPhotoFile?.path)
                    : ''
                }
                onImageSelected={() => {}}
                ratio={MOVIE_BANNER_RATIO}
                minH={150}
              />
            </Box>
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Poster Image
            </Text>
            <HStack justifyContent="center">
              <Box pointerEvents="none">
                <UploadImage
                  src={
                    movie?.posterPhotoFile?.path
                      ? getCDNPath(movie?.posterPhotoFile?.path)
                      : ''
                  }
                  onImageSelected={() => {}}
                  ratio={MOVIE_POSTER_RATIO}
                  minH={150}
                  maxW={250}
                />
              </Box>
            </HStack>
          </Box>
          <RHFInput
            name="title"
            placeholder="Title"
            label="Title"
            InputProps={{
              variant: 'filled',
              isReadOnly: true,
            }}
          />
          <RHFInput
            name="tagline"
            placeholder="Tag Line"
            label="Tag Line"
            InputProps={{
              variant: 'filled',
              isReadOnly: true,
            }}
          />
          <RHFTextarea
            name="summary"
            placeholder="Summary"
            label="Summary"
            TextareaProps={{
              variant: 'filled',
              isReadOnly: true,
            }}
          />

          <RHFCombobox<CountryData>
            name="originalLanguage"
            label="Original Language"
            options={allCountries()}
            selectProps={{
              isReadOnly: true,
              getOptionLabel(item: any) {
                return item.countryNameLocal;
              },
              filterOption: ({ data }: any, inputValue) =>
                data?.officialLanguageCode
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()) ||
                data?.officialLanguageNameLocal
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()) ||
                data?.officialLanguageNameEn
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()),
              components: {
                Option: ({ data, innerProps }: any) => (
                  <HStack
                    {...innerProps}
                    key={`original-language-item-${data?.officialLanguageCode}`}
                    _hover={{
                      cursor: 'pointer',
                    }}
                    m={2}
                  >
                    <Iconify
                      icon={`flag:${data?.countryCode?.toLowerCase()}-4x3`}
                      boxSize={6}
                    />
                    <Text>{data?.officialLanguageNameLocal}</Text>
                  </HStack>
                ),
                SingleValue: ({ data }: any) => (
                  <HStack
                    key={`country-item-${data?.officialLanguageCode}`}
                    _hover={{
                      cursor: 'pointer',
                    }}
                    m={2}
                  >
                    <Iconify
                      icon={`flag:${data?.officialLanguageCode?.toLowerCase()}-4x3`}
                      boxSize={6}
                    />

                    <Text>{data?.officialLanguageNameLocal}</Text>
                  </HStack>
                ),
              },
            }}
          />

          <RHFCombobox<CountryData>
            name="releaseCountry"
            label="Release Country"
            options={allCountries()}
            selectProps={{
              isReadOnly: true,
              getOptionLabel(item: any) {
                return item.countryNameLocal;
              },
              filterOption: ({ data }: any, inputValue) =>
                data?.countryNameEn
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()) ||
                data?.countryNameLocal
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()) ||
                data?.countryCode
                  ?.toLowerCase()
                  ?.includes(inputValue?.toLowerCase()),
              components: {
                Option: ({ data, innerProps }: any) => (
                  <HStack
                    {...innerProps}
                    key={`country-item-${data?.countryCode}`}
                    _hover={{
                      cursor: 'pointer',
                    }}
                    m={2}
                  >
                    <Iconify
                      icon={`flag:${data?.countryCode?.toLowerCase()}-4x3`}
                      boxSize={6}
                    />
                    <Text>{data?.countryNameLocal}</Text>
                  </HStack>
                ),
                SingleValue: ({ data }: any) => (
                  <HStack
                    key={`country-item-${data?.countryCode}`}
                    _hover={{
                      cursor: 'pointer',
                    }}
                    m={2}
                  >
                    <Iconify
                      icon={`flag:${data?.countryCode?.toLowerCase()}-4x3`}
                      boxSize={6}
                    />

                    <Text>{data?.countryNameLocal}</Text>
                  </HStack>
                ),
              },
            }}
          />
          <RHFInput
            name="releaseDate"
            placeholder="Release Date"
            label="Release Date"
            type="date"
            InputProps={{
              variant: 'filled',
              isReadOnly: true,
            }}
          />
          <RHFDropdown
            name="certification"
            label="Certification"
            disableChooseOption
            options={
              Object.entries(CertificationEnum)
                .filter(([, value]) => typeof value === 'number')
                .map(([key, value]) => ({ key, value })) as {
                key: string;
                value: string;
              }[]
            }
            renderOption={({ key, value }) => (
              <option key={key} value={value}>
                {capitalCase(key)}
              </option>
            )}
            SelectProps={{
              isReadOnly: true,
              variant: 'filled',
            }}
          />
          <RHFInput
            name="trailer"
            placeholder="Trailer Link"
            label="Trailer Link"
            InputProps={{
              variant: 'filled',
              isReadOnly: true,
            }}
          />
          <RHFNumberInput
            name="budget"
            placeholder="Budget"
            label="Budget"
            InputProps={{
              variant: 'filled',
              isReadOnly: true,
            }}
          />
          <RHFNumberInput
            name="revenue"
            placeholder="Revenue"
            label="Revenue"
            InputProps={{
              variant: 'filled',
              isReadOnly: true,
            }}
          />
          <RHFNumberInput
            name="runtime.hours"
            placeholder="Hour"
            label="Hour"
            InputProps={{
              variant: 'filled',
              isReadOnly: true,
            }}
          />
          <RHFNumberInput
            name="runtime.minutes"
            placeholder="Minute"
            label="Minute"
            InputProps={{
              variant: 'filled',
              isReadOnly: true,
              max: 59,
            }}
          />
          <RHFNumberInput
            name="runtime.seconds"
            placeholder="Seconds"
            label="Seconds"
            InputProps={{
              variant: 'filled',
              max: 59,
              isReadOnly: true,
            }}
          />
          <Genres />
          <People persons={(movie?.moviePersons as any) ?? []} />
          <AdderUser user={movie?.user} />
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <Button
          variant="outline"
          colorScheme="red"
          mr={3}
          onClick={handleReject}
        >
          Reject
        </Button>
        <Button type="submit" isLoading={loading} onClick={handleAccept}>
          Accept
        </Button>
      </DrawerFooter>
    </FormProvider>
  );
}
