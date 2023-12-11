import { Box, BoxProps } from '@chakra-ui/react';
import NextImage from 'next/image';

type Props = {
  src: string;
  alt?: string;
} & BoxProps;

export default function Image({ src, alt = '', ...boxProps }: Props) {
  return (
    <Box {...boxProps}>
      <NextImage
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
      />
    </Box>
  );
}
