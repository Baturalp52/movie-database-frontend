import Iconify from '@/components/iconify';
import { UserType } from '@/types/user.type';
import {
  Box,
  Card,
  CardBody,
  HStack,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';

type Props = {
  user: UserType;
};

export default function SideInfoSection({ user }: Props) {
  return (
    <Card>
      <CardBody>
        <VStack alignItems="stretch">
          <Box>
            <Text fontWeight="bold">Social Media</Text>
            <VStack p={2} alignItems="stretch">
              {user?.socialMediaItems?.map(({ id, url, icon, name }) => (
                <Card key={`user-social-media-${id}`}>
                  <CardBody>
                    <Link href={url} isExternal>
                      <HStack>
                        <Iconify icon={icon} boxSize={6} />
                        <Text>{name}</Text>
                      </HStack>
                    </Link>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
}
