import { Card, CardBody, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { kebabCase } from 'change-case';
import Image from '../image';
import getCDNPath from '@/utils/get-cdn-path.util';
import TextMaxLine from '../text-max-line';
import Iconify from '../iconify';
import { PersonsPostSearchPersonType } from '@/services/persons/person.type';

type Props = {
  person: PersonsPostSearchPersonType;
};

export default function PersonCard({ person }: Props) {
  const { id, firstName, lastName, photoFile, bio, birthPlace } = person;

  return (
    <Link href={`/people/${kebabCase(firstName + lastName)}-${id}`}>
      <Card maxW="3xs">
        <CardBody>
          <Image
            src={getCDNPath(photoFile?.path)}
            alt={firstName + lastName}
            borderRadius="lg"
          />
          <Stack mt="2" spacing="3">
            <HStack>
              <Text fontSize="md">
                {firstName} {lastName}
              </Text>
              <Iconify
                icon={`flag:${birthPlace?.toLowerCase()}-4x3`}
                boxSize={4}
              />
            </HStack>
            <TextMaxLine fontSize="2xs">{bio}</TextMaxLine>
          </Stack>
        </CardBody>
      </Card>
    </Link>
  );
}
