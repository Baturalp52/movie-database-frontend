/* theme.ts */
import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultSize,
  withDefaultVariant,
  theme as baseTheme,
  StyleFunctionProps,
} from '@chakra-ui/react';

export const theme = extendTheme(
  {
    fonts: {
      heading: 'var(--font-rubik)',
      body: 'var(--font-rubik)',
    },
    components: {
      Link: {
        baseStyle: {
          textDecoration: 'none',
          _hover: {
            textDecoration: 'none',
          },
        },
      },
      Button: {
        variants: {
          ghost: (props: StyleFunctionProps) => ({
            ...baseTheme.components?.Button?.variants?.ghost(props),
            color: 'white',
            _hover: {
              color: `${props.colorScheme}.600`,
              background: `${props.colorScheme}.200`,
            },
          }),
          rounded: (props: StyleFunctionProps) => ({
            ...baseTheme.components?.Button?.variants?.solid(props),
            borderRadius: 20,
          }),
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
