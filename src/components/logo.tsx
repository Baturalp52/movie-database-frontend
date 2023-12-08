import { HStack, Text } from '@chakra-ui/react';
import Iconify from './iconify';

export default function Logo() {
  return (
    <HStack
      color="white"
      _hover={{
        textDecoration: 'none',
        userSelect: 'none',
      }}
    >
      <Iconify icon="mingcute:movie-fill" boxSize={50} />
      <Text fontSize="2xl" fontWeight="bold">
        Movie Database
      </Text>
    </HStack>
  );
}
