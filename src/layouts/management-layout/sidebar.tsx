'use client';

import { Button, VStack } from '@chakra-ui/react';
import { adminRoutes, editorRoutes } from './links';
import { usePathname, useRouter } from 'next/navigation';
import Iconify from '@/components/iconify';
import useAuth from '@/hooks/use-auth';
import { UserRoleEnum } from '@/enums/role.enum';
import { ROUTES } from '@/utils/routes';

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { push } = useRouter();
  return (
    <VStack
      spacing={4}
      height="100%"
      bgColor="orange.200"
      width={250}
      p={4}
      borderRadius={4}
    >
      <Button
        w="100%"
        colorScheme="orange"
        variant={pathname === ROUTES.MANAGEMENT.ROOT ? 'solid' : 'ghost'}
        justifyContent="flex-start"
        onClick={() => {
          push(ROUTES.MANAGEMENT.ROOT);
        }}
      >
        <Iconify icon="ic:round-dashboard" mr={2} boxSize={'24px'} />
        Dashboard
      </Button>
      {editorRoutes.map(({ label, path, icon }, index: number) => {
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
      {user?.role === UserRoleEnum.ADMIN &&
        adminRoutes.map(({ label, path, icon }, index: number) => {
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
