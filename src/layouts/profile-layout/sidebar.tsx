'use client';

import { Button, VStack } from '@chakra-ui/react';
import { profileSidebarLinks } from './links';
import { usePathname, useRouter } from 'next/navigation';
import Iconify from '@/components/iconify';

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { push } = useRouter();
  return (
    <VStack
      spacing={4}
      height="100%"
      bgColor="orange.200"
      width={200}
      p={4}
      borderRadius={4}
    >
      {profileSidebarLinks.map(({ label, path, icon }, index: number) => {
        const selected = pathname === path;
        return (
          <Button
            key={`profile-sidebar-link-${index}`}
            w="100%"
            colorScheme="orange"
            variant={selected ? 'solid' : 'ghost'}
            justifyContent="flex-start"
            onClick={() => {
              push(path);
            }}
          >
            <Iconify icon={icon} mr={2} boxSize={'24px'} />
            {label}
          </Button>
        );
      })}
    </VStack>
  );
}
