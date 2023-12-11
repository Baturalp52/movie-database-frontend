'use client';
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Props = {
  target?: string;
};

export default function SearchBar({ target = '' }: Props) {
  const [searchText, setSearchText] = useState('');
  const { push } = useRouter();
  return (
    <Box width="100%" m={2}>
      <InputGroup>
        <Input
          placeholder="Search movies"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <InputRightElement w="auto">
          <Button
            onClick={() => {
              push(`${target}?query=${searchText}`);
            }}
            colorScheme="orange"
            borderTopLeftRadius={20}
            borderBottomLeftRadius={20}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
}
