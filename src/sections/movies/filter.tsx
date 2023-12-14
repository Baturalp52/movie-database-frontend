'use client';

import Iconify from '@/components/iconify';
import useFetch from '@/hooks/use-fetch';
import GenresService from '@/services/genres/genres.service';
import { MoviesPostSearchMovieRequestType } from '@/services/movies/movie.type';
import { GenreType } from '@/types/genre.type';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import {
  CountryProperty,
  all as allCountries,
  filter as filterCountries,
} from 'country-codes-list';
import { usePathname, useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

type Props = {
  filter: MoviesPostSearchMovieRequestType;
  setFilter: Dispatch<SetStateAction<MoviesPostSearchMovieRequestType>>;
};

export default function MoviesFilter({ filter, setFilter }: Props) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const fetchGenres = useCallback(async () => GenresService.getAllGenres(), []);
  const { data: genresData = [] } = useFetch<GenreType[]>(fetchGenres);

  const [releaseYear, setReleaseYear] = useState('');
  const [rate, setRate] = useState('');
  const [originalLanguage, setOriginalLanguage] = useState<any>(null);
  const [releaseCountry, setReleaseCountry] = useState<any>(null);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const years = Array.from(
    new Array(new Date().getFullYear() - 1899),
    (val, index) => ({
      value: (index + 1900).toString(),
      label: (index + 1900).toString(),
    }),
  );

  const rates = Array.from(new Array(10), (val, index) => ({
    value: (index + 1).toString(),
    label: (index + 1).toString(),
  }));

  useEffect(() => {
    setReleaseYear(filter.releaseYear?.toString() ?? '');
    setRate(filter.rate?.toString() ?? '');
    setOriginalLanguage(
      filterCountries(
        'officialLanguageCode' as CountryProperty,
        filter.originalLanguage ?? '',
      )[0] ?? '',
    );
    setReleaseCountry(
      filterCountries(
        'countryCode' as CountryProperty,
        filter.releaseCountry ?? '',
      )[0] ?? '',
    );

    setGenres(
      filter.genres?.map((genre) => ({
        id: genre,
        name: genresData?.find((g) => g.id === genre)?.name ?? '',
      })) ?? [],
    );
  }, [filter, genresData]);

  const handleClear = () => {
    setFilter(({ text }) => ({
      text,
      releaseYear: null,
      releaseCountry: '',
      originalLanguage: '',
      genres: [],
      rate: null,
    }));
  };

  const handleFilter = () => {
    const searchParams = new URLSearchParams();
    if (filter.text) {
      searchParams.set('q', filter.text);
    }
    if (releaseYear) {
      searchParams.set('releaseYear', releaseYear);
    }
    if (rate) {
      searchParams.set('rate', rate);
    }
    if (originalLanguage) {
      searchParams.set('originalLanguage', originalLanguage?.countryCode);
    }
    if (releaseCountry) {
      searchParams.set('releaseCountry', releaseCountry?.countryCode);
    }
    if (genres.length > 0) {
      searchParams.set('genres', genres.map((genre) => genre.id).join(','));
    }
    replace(pathname + '?' + searchParams.toString());
    setFilter(({ text }) => ({
      text,
      releaseYear: releaseYear ? parseInt(releaseYear) : null,
      rate: rate ? parseInt(rate) : null,
      originalLanguage: originalLanguage?.officialLanguageCode,
      releaseCountry: releaseCountry?.countryCode,
      genres: genres.map((genre) => genre.id),
    }));
  };

  return (
    <Card flex={1}>
      <CardHeader>
        <Heading>Filter</Heading>
      </CardHeader>
      <CardBody>
        <FormControl>
          <FormLabel>Release Year</FormLabel>
          <Select
            options={years}
            value={{
              value: releaseYear ?? '',
              label: releaseYear ?? '',
            }}
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
            onChange={(value) => setReleaseYear(value?.value ?? '')}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Rate</FormLabel>

          <Select
            options={rates}
            value={{
              value: rate ?? '',
              label: rate ?? '',
            }}
            isSearchable={false}
            getOptionLabel={(option) =>
              Array.from(Array(+option.value), () => '⭐').join('')
            }
            getOptionValue={(option) => option.value}
            onChange={(value) => setRate(value?.value ?? '')}
            components={{
              Option: ({ data, innerProps }) => (
                <HStack
                  key={`star-${data.value}`}
                  {...innerProps}
                  _hover={{
                    cursor: 'pointer',
                  }}
                  m={2}
                >
                  {Array.from(Array(+data.value), (_, i) => (
                    <Iconify
                      key={`star-${+data.value}-${i}`}
                      icon={'bi:star-fill'}
                      color="yellow.400"
                      boxSize={4}
                    />
                  ))}
                </HStack>
              ),
            }}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Original Language</FormLabel>
          <Select
            value={originalLanguage}
            onChange={(value) => setOriginalLanguage(value ?? '')}
            options={allCountries()}
            getOptionLabel={(option) => option.officialLanguageNameLocal}
            filterOption={({ data }, inputValue) =>
              data?.officialLanguageCode
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase()) ||
              data?.officialLanguageNameEn
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase()) ||
              data?.officialLanguageLocal
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase())
            }
            getOptionValue={(option) => option.countryCode}
            components={{
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
                    icon={`flag:${data?.countryCode?.toLowerCase()}-4x3`}
                    boxSize={6}
                  />

                  <Text>{data?.officialLanguageNameLocal}</Text>
                </HStack>
              ),
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Release Country</FormLabel>
          <Select
            value={releaseCountry}
            onChange={(value) => setReleaseCountry(value ?? '')}
            options={allCountries()}
            getOptionLabel={(option) => option.countryNameLocal}
            filterOption={({ data }, inputValue) =>
              data?.countryCode
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase()) ||
              data?.countryNameLocal
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase()) ||
              data?.countryNameEn
                ?.toLowerCase()
                ?.includes(inputValue?.toLowerCase())
            }
            getOptionValue={(option) => option.countryCode}
            components={{
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
            }}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Genres</FormLabel>
          <Select
            options={genresData ?? []}
            isMulti
            value={genres}
            onChange={(value) => setGenres([...value] ?? [])}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id + ''}
            components={{
              Option: (props: any) => {
                return (
                  <MenuItem onClick={props.innerProps.onClick}>
                    {props.data.name}
                  </MenuItem>
                );
              },
            }}
          />
        </FormControl>
      </CardBody>
      <CardFooter justifyContent="end" gap={2}>
        <Button onClick={handleClear} colorScheme="gray">
          Clear Filter
        </Button>
        <Button onClick={handleFilter}>Apply Filter</Button>
      </CardFooter>
    </Card>
  );
}
