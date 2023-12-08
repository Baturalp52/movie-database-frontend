/* theme.ts */
import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultSize,
  withDefaultVariant,
} from '@chakra-ui/react';

export const theme = extendTheme(
  {
    fonts: {
      heading: 'var(--font-rubik)',
      body: 'var(--font-rubik)',
    },
    components: {
      Button: {
        variants: {
          ghost: {
            color: 'white',
            _hover: {
              color: 'black',
            },
          },
        },
      },
    },
  },
  withDefaultColorScheme({ colorScheme: 'teal' }),
  withDefaultSize({ size: 'md' }),
  withDefaultVariant({
    variant: 'solid',
  }),
);
