import LoadingLogo from '@/components/loading-logo';
import useFetch from '@/hooks/use-fetch';
import GenresService from '@/services/genres/genres.service';
import { GenreType } from '@/types/genre.type';
import { Box, MenuItem } from '@chakra-ui/react';
import { useCallback } from 'react';
import RHFCombobox from '@/components/hook-form/combobox';

export default function Genres() {
  const fetchGenres = useCallback(async () => GenresService.getAllGenres(), []);
  const { data = [], loading } = useFetch<GenreType[]>(fetchGenres);

  return (
    <Box>
      {loading ? (
        <LoadingLogo />
      ) : (
        <RHFCombobox
          label="Genres"
          name="genres"
          options={(data as any) ?? []}
          selectProps={{
            isReadOnly: true,
            isMulti: true,
            onChange: () => {},
            getOptionLabel: (option: any) => option.name,
            getOptionValue: (option: any) => option.id,
            components: {
              Option: (props: any) => {
                return (
                  <MenuItem onClick={props.innerProps.onClick}>
                    {props.data.name}
                  </MenuItem>
                );
              },
            },
          }}
        />
      )}
    </Box>
  );
}
