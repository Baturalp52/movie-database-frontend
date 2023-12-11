'use client';
import { Box, BoxProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

type Props = BoxProps;

export default function LoadingLogo(props: Props) {
  return (
    <Box {...props}>
      <svg
        width="160px"
        height="160px"
        viewBox="0 0 30 30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, pathOffset: 0 }}
          animate={{ pathLength: [0, 1, 1], pathOffset: [0, 0, 1] }}
          fill="transparent"
          stroke="black"
          strokeLinecap="round"
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: 0,
            ease: 'linear',
          }}
          d="M12 2c5.523 0 10 4.477 10 10a9.982 9.982 0 0 1-3.76 7.814l-.239.186H20a1 1 0 0 1 .117 1.993L20 22h-8C6.477 22 2 17.523 2 12S6.477 2 12 2Zm0 2a8 8 0 1 0 0 16a8 8 0 0 0 0-16Zm0 10a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm-4-4a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm8 0a2 2 0 1 1 0 4a2 2 0 0 1 0-4Zm-4-4a2 2 0 1 1 0 4a2 2 0 0 1 0-4Z"
        />
      </svg>
    </Box>
  );
}
