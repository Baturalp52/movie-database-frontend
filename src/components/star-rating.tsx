import React, { useState } from 'react';
import { Radio, HStack, Box } from '@chakra-ui/react';
import Iconify from './iconify';

type Props = {
  rating: number;
  setRating: (rating: number) => void;
  count?: number;
  size?: number;
};

export default function StarRating({ rating, setRating, count, size }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  return (
    <HStack spacing={'2px'}>
      {[...Array(count || 5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <Box
            as="label"
            key={index}
            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          >
            <Radio
              name="rating"
              onChange={() => setRating(ratingValue)}
              value={ratingValue + ''}
              display="none"
            ></Radio>
            <Iconify
              boxSize={size || 6}
              icon="bx:bxs-star"
              _hover={{ cursor: 'pointer', transform: 'scale(1.2)' }}
              transition="all 200ms"
            />
          </Box>
        );
      })}
    </HStack>
  );
}
