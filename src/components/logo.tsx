import { BoxProps, HStack, Text } from '@chakra-ui/react';
import Iconify from './iconify';

type Props = BoxProps;

export default function Logo({ color = 'white', ...props }: Props) {
  return (
    <HStack
      color={color}
      _hover={{
        textDecoration: 'none',
        userSelect: 'none',
      }}
      {...props}
    >
      <Iconify icon="mingcute:movie-fill" boxSize={50} />
      <Text fontSize="2xl" fontWeight="bold">
        Movie Database
      </Text>
    </HStack>
  );
}
