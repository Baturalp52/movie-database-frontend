import { Text, TextProps } from '@chakra-ui/react';
import React from 'react';

type Props = {
  children: React.ReactNode;
  maxLines?: number;
} & TextProps;

export default function TextMaxLine({
  children,
  maxLines = 2,
  ...textProps
}: Props) {
  const style = {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    WebkitLineClamp: maxLines,
    textOverflow: 'ellipsis',
  };

  return (
    <Text sx={style} {...textProps}>
      {children}
    </Text>
  );
}
