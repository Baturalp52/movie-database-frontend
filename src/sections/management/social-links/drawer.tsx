import Iconify from '@/components/iconify';
import SocialMediaItemsService from '@/services/social-media-items/social-media-items.service';
import { SocialMediaItemType } from '@/types/social-media-item.type';
import {
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
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type Props = {
  socialMediaItem: SocialMediaItemType | null;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export default function SocialMediaItemDrawer({
  socialMediaItem,
  refetch,
  isOpen,
  onClose,
}: Props) {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const handleSave = async () => {
    setLoading(true);
    if (socialMediaItem?.id) {
      const res = await SocialMediaItemsService.putSocialMediaItem(
        socialMediaItem.id,
        {
          name,
          icon,
        },
      );
      if (res.success) {
        toast({
          title: 'Update social link',
          description: `Social link ${name} updated successfully`,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        onClose();
      }
    } else {
      const res = await SocialMediaItemsService.postSocialMediaItem({
        name,
        icon,
      });
      if (res.success) {
        toast({
          title: 'Create social link',
          description: `Social link ${name} created successfully`,
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
    if (socialMediaItem?.id) {
      setName(socialMediaItem.name);
      setIcon(socialMediaItem.icon);
    } else {
      setName('');
      setIcon('');
    }
  }, [socialMediaItem]);

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {socialMediaItem?.id ? 'Edit' : 'Create'} Social link
        </DrawerHeader>

        <DrawerBody>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              variant="filled"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id="name">
            <FormLabel>icon</FormLabel>
            <InputGroup>
              <Input
                variant="filled"
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
              <InputRightElement>
                <Iconify icon={icon} boxSize={6} />
              </InputRightElement>
            </InputGroup>
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
