import SearchBar from '@/components/search-bar';
import { Container, Text } from '@chakra-ui/react';

export default function HomeWelcomeSection() {
  return (
    <Container maxW="container.xl" position="relative" bgColor="teal" p={4}>
      <Text fontSize="6xl" color="white">
        Welcome!
      </Text>
      <Text fontSize="3xl" color="white">
        Lots of movies are here. Start exploring!
      </Text>
      <SearchBar target="/movies" />
    </Container>
  );
}
