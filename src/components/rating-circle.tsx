import { Box, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

type Props = {
  rate?: number;
};

export default function RatingCircle({ rate }: Props) {
  return (
    <Box
      borderRadius="50%"
      overflow="hidden"
      transition="all 0.2s ease-in-out"
      _hover={{
        transform: 'scale(1.1)',
      }}
    >
      <CircularProgress
        size="60px"
        thickness="4px"
        color="teal"
        backgroundColor="white"
        value={(rate ?? 10) * 10}
      >
        <CircularProgressLabel color="teal">
          {rate ?? 'N/A'}
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}
