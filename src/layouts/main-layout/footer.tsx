'use client';

import Logo from '@/components/logo';
import { ROUTES } from '@/utils/routes';
import {
  Box,
  Container,
  Divider,
  HStack,
  Link,
  Text,
  VStack,
  useConst,
} from '@chakra-ui/react';
import { capitalCase } from 'change-case';

const routes = {
  HOME: ROUTES.HOME,
  MOVIES: ROUTES.MOVIES,
  PEOPLE: ROUTES.PEOPLE,
};

export default function MainFooter() {
  const links = useConst(() => {
    const arr = Object.entries(routes).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => typeof value === 'string',
    );
    const links = [];
    while (arr.length) {
      links.push(arr.splice(0, 4));
    }
    return links;
  });

  return (
    <Box
      backgroundColor="teal"
      padding={4}
      color="white"
      textAlign="center"
      fontSize="sm"
      minHeight={200}
    >
      <Container maxW="4xl">
        <HStack alignItems="stretch" justifyContent="space-between" gap={5}>
          <VStack alignItems="flex-start">
            <Logo />
          </VStack>

          <Box mt={50} flex={1}>
            <Box w="fit-content">
              <Divider />
              <HStack alignItems="flex-start">
                {links.map((innerLinks, index: number) => (
                  <VStack key={`link-tree-${index}`} alignItems="flex-start">
                    {innerLinks.map(([key, value]: any) => (
                      <Box key={`link-${key}`}>
                        <Text fontWeight="bold" fontSize="lg">
                          <Link href={value}>{capitalCase(key)}</Link>
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                ))}
              </HStack>
            </Box>
          </Box>
        </HStack>
        <Box mt={5}>
          <Text fontSize="xs" fontWeight="bold">
            Made with ❤️ by{' '}
            <Link href="https://github.com/Baturalp52" isExternal>
              Baturalp Sönmez
            </Link>
          </Text>
        </Box>
      </Container>
    </Box>
  );
}
