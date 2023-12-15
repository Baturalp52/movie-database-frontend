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
  FormControl,
  FormLabel,
} from '@chakra-ui/react';
import getCDNPath from '@/utils/get-cdn-path.util';
import UploadImage from '@/components/upload-image';
import { useEffect, useState } from 'react';
import RHFDropdown from '@/components/hook-form/dropdown';
import { capitalCase } from 'change-case';
import FilesService from '@/services/files/files.service';
import { movieSchema } from './movie.schema';
import RHFCombobox from '@/components/hook-form/combobox';
import { CountryData, all as allCountries } from 'country-codes-list';
import Iconify from '@/components/iconify';
import {
  MoviesPostMovieRequestType,
  MoviesPutMovieRequestType,
} from '@/services/movies/movie.type';
import { MovieType } from '@/types/movie.type';
import { MOVIE_POSTER_RATIO } from '@/constants/movie-poster-ratio.constant';
import { MOVIE_BANNER_RATIO } from '@/constants/movie-banner-ratio.constant';
import { CertificationEnum } from '@/enums/certification.enum';
import RHFNumberInput from '@/components/hook-form/number-input';
import Genres from './genres';
import { GenreType } from '@/types/genre.type';
import People from './people';
import { CreatableSelect } from 'chakra-react-select';

type Props = {
  movie: MovieType | null;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
};

export default function MovieForm({ movie, onSubmit, onClose }: Props) {
  const [newPosterPhotoFile, setNewPosterPhotoFile] = useState<File | null>(
    null,
  );
  const [newBannerPhotoFile, setNewBannerPhotoFile] = useState<File | null>(
    null,
  );

  const [persons, setPersons] = useState<any[]>([]);

  const methods = useForm<MovieType>({
    defaultValues: movie || {},
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(movieSchema) as any,
  });

  const { formState, reset, trigger, setValue, watch } = methods;

  const keywords = watch('keywords');

  const { isSubmitting, isValid, errors } = formState;
  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    if (!movie) return;

    setPersons(movie?.moviePersons ?? []);
    reset(movie);
  }, [movie, reset]);

  const handleSubmit = async (
    data: MoviesPutMovieRequestType | MoviesPostMovieRequestType,
  ) => {
    if (newPosterPhotoFile) {
      const formData = new FormData();
      formData.append('file', newPosterPhotoFile);
      const res = await FilesService.postMoviesPoster(formData);
      data.posterPhotoId = res.data?.id;
    }
    if (newBannerPhotoFile) {
      const formData = new FormData();
      formData.append('file', newBannerPhotoFile);
      const res = await FilesService.postMoviesBanner(formData);
      data.bannerPhotoId = res.data?.id;
    }

    data.releaseCountry = (data.releaseCountry as any)?.countryCode;
    data.originalLanguage = (data.originalLanguage as any)
      ?.officialLanguageCode;

    data.genres = (data.genres as GenreType[]).map((genre) => genre.id) as any;

    if ((data as any).posterPhotoFile) delete (data as any).posterPhotoFile;
    if ((data as any).bannerPhotoFile) delete (data as any).bannerPhotoFile;
    data.runtime =
      (data.runtime as any).hours * 60 * 60 +
      (data.runtime as any).minutes * 60 +
      (data.runtime as any).seconds;

    data.moviePersons = persons.map((person) => ({
      personId: person.id,
      roleName: person.roleName,
      personTypes: person.personTypes.map((personType: any) => personType.id),
    })) as any;

    delete data.userRate;

    await onSubmit(data);

    onClose();
  };

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit}
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
            <UploadImage
              src={
                movie?.bannerPhotoFile?.path
                  ? getCDNPath(movie?.bannerPhotoFile?.path)
                  : ''
              }
              onImageSelected={(file) => {
                setNewBannerPhotoFile(file);
              }}
              ratio={MOVIE_BANNER_RATIO}
              minH={150}
            />
          </Box>
          <Box>
            <Text fontSize="lg" fontWeight="bold">
              Poster Image
            </Text>
            <HStack justifyContent="center">
              <UploadImage
                src={
                  movie?.posterPhotoFile?.path
                    ? getCDNPath(movie?.posterPhotoFile?.path)
                    : ''
                }
                onImageSelected={(file) => {
                  setNewPosterPhotoFile(file);
                }}
                ratio={MOVIE_POSTER_RATIO}
                minH={150}
                maxW={250}
              />
            </HStack>
          </Box>
          <RHFInput
            name="title"
            placeholder="Title"
            label="Title"
            InputProps={{
              variant: 'filled',
            }}
          />
          <RHFInput
            name="tagline"
            placeholder="Tag Line"
            label="Tag Line"
            InputProps={{
              variant: 'filled',
            }}
          />
          <RHFTextarea
            name="summary"
            placeholder="Summary"
            label="Summary"
            TextareaProps={{
              variant: 'filled',
            }}
          />

          <RHFCombobox<CountryData>
            name="originalLanguage"
            label="Original Language"
            options={allCountries()}
            selectProps={{
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
              variant: 'filled',
            }}
          />
          <RHFInput
            name="trailer"
            placeholder="Trailer Link"
            label="Trailer Link"
            InputProps={{
              variant: 'filled',
            }}
          />
          <RHFNumberInput
            name="budget"
            placeholder="Budget"
            label="Budget"
            InputProps={{
              variant: 'filled',
            }}
          />
          <RHFNumberInput
            name="revenue"
            placeholder="Revenue"
            label="Revenue"
            InputProps={{
              variant: 'filled',
            }}
          />
          <RHFNumberInput
            name="runtime.hours"
            placeholder="Hour"
            label="Hour"
            InputProps={{
              variant: 'filled',
            }}
          />
          <RHFNumberInput
            name="runtime.minutes"
            placeholder="Minute"
            label="Minute"
            InputProps={{
              variant: 'filled',
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
            }}
          />
          <FormControl>
            <FormLabel>Key words</FormLabel>
            <CreatableSelect
              isMulti
              value={keywords?.map((keyword) => ({
                label: keyword,
                value: keyword,
              }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.stopPropagation();
                }
              }}
              options={[]}
              onChange={(values) => {
                setValue(
                  'keywords',
                  values.map((value: any) => value.value),
                );
              }}
            />
          </FormControl>

          <Genres />
          <People persons={persons} setPersons={setPersons} />
        </VStack>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting} isDisabled={!isValid}>
          Save
        </Button>
      </DrawerFooter>
      <VStack spacing={2} alignItems="flex-end">
        {Object.entries(errors).map(([key, value]) => (
          <Text key={`error-${key}`} color="red">
            {value?.message}
          </Text>
        ))}
      </VStack>
    </FormProvider>
  );
}
