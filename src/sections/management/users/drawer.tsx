import { UserRoleEnum } from '@/enums/role.enum';
import UsersService from '@/services/users/users.service';
import { UsersPostSearchUserResponseType } from '@/services/users/users.type';
import getCDNPath from '@/utils/get-cdn-path.util';
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  user: UsersPostSearchUserResponseType;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function UserDrawer({ user, refetch, isOpen, onClose }: Props) {
  const { firstName, lastName, profilePhotoFile, username } = user;
  const [role, setRole] = useState<UserRoleEnum>(UserRoleEnum.USER);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSave = async () => {
    setLoading(true);
    if (user?.id) {
      const res = await UsersService.putUser(user.id, { role });
      if (res.success) {
        toast({
          title: 'Update role',
          description: `Role ${name} updated successfully`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onClose();
      }
    }
    refetch();
    setLoading(false);
  };

  useEffect(() => {
    setRole(user.role);
  }, [user]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Heading>Edit User</Heading>
          <HStack spacing={2} my={2} alignItems="center">
            <Avatar
              size="sm"
              src={
                profilePhotoFile?.path ? getCDNPath(profilePhotoFile?.path) : ''
              }
              name={
                firstName && lastName ? firstName + ' ' + lastName : username
              }
            />
            <Text textAlign="start">
              {firstName && lastName
                ? `${firstName} ${lastName}`
                : `@${username}`}
            </Text>
          </HStack>
        </DrawerHeader>

        <DrawerBody>
          <FormControl id="role">
            <FormLabel>Role</FormLabel>
            <Select
              variant="filled"
              value={role}
              onChange={(e) => {
                setRole(parseInt(e.target.value) as UserRoleEnum);
              }}
            >
              <option value={UserRoleEnum.USER}>User</option>
              <option value={UserRoleEnum.EDITOR}>Editor</option>
              <option value={UserRoleEnum.ADMIN}>Admin</option>
            </Select>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" colorScheme="red" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} isLoading={loading}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
