import Iconify from '@/components/iconify';
import { UsersPostSearchUser } from '@/services/users/users.type';
import getCDNPath from '@/utils/get-cdn-path.util';
import { Avatar, HStack, IconButton, Text } from '@chakra-ui/react';

type Props = {
  user: UsersPostSearchUser;
  onEdit: (user: UsersPostSearchUser) => void;
};

export default function UserItem({ user, onEdit }: Props) {
  const { firstName, lastName, profilePhotoFile, username } = user;
  return (
    <HStack borderRadius={2} background="orange" p={4} color="white">
      <HStack spacing={2} flex={1} alignItems="center">
        <Avatar
          size="sm"
          src={profilePhotoFile?.path ? getCDNPath(profilePhotoFile?.path) : ''}
          name={firstName && lastName ? firstName + ' ' + lastName : username}
        />
        <Text textAlign="start">
          {firstName && lastName ? `${firstName} ${lastName}` : `@${username}`}
        </Text>
      </HStack>
      <IconButton
        aria-label="edit"
        colorScheme="teal"
        variant="ghost"
        isRound
        icon={<Iconify icon="mdi:pencil" boxSize={6} />}
        onClick={() => {
          onEdit(user);
        }}
      />
    </HStack>
  );
}
