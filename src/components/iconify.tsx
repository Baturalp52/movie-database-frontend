'use client';

import { Box, BoxProps } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

type Props = {
  icon: string;
} & BoxProps;

export default function Iconify({ icon, ...props }: Props) {
  return (
    <Box {...props}>
      <Icon icon={icon} width="100%" height="100%" />
    </Box>
  );
}
