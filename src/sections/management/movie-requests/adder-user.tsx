import { UserType } from '@/types/user.type';
import getCDNPath from '@/utils/get-cdn-path.util';
import {
  Avatar,
  Box,
  Card,
  CardBody,
  FormLabel,
  HStack,
  Link,
  Text,
} from '@chakra-ui/react';

type Props = {
  user?: UserType;
};

export default function AdderUser({ user }: Props) {
  if (!user) return <></>;
  return (
    <Box>
      <FormLabel>Adder</FormLabel>

      <Card>
        <CardBody>
          <Link href={`/users/${user?.id}`} isExternal>
            <HStack>
              <Avatar
                size="sm"
                name={
                  user?.firstName && user?.lastName
                    ? user?.firstName + ' ' + user?.lastName
                    : user?.auth?.username
                }
                src={
                  user?.profilePhotoFile?.path
                    ? getCDNPath(user?.profilePhotoFile?.path)
                    : ''
                }
              />
              <Text>
                {user?.firstName && user?.lastName
                  ? user?.firstName + ' ' + user?.lastName
                  : '@' + user?.auth?.username}
              </Text>
            </HStack>
          </Link>
        </CardBody>
      </Card>
    </Box>
  );
}
