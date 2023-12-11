import Logo from '@/components/logo';
import { Box, Button, Container, HStack, Text, VStack } from '@chakra-ui/react';

export default function Page404() {
  return (
    <Container>
      <VStack spacing={4} alignItems="center" justifyContent="center">
        <HStack
          alignItems="flex-start"
          justifyContent="center"
          mt={300}
          spacing={4}
        >
          <Logo color="orange" />
          <Box>
            <Text fontSize="4xl">404</Text>
            <Text fontSize="2xl">Page not found!</Text>
          </Box>
        </HStack>
        <Button as="a" href="/" colorScheme="orange">
          Go Home
        </Button>
      </VStack>
    </Container>
  );
}
