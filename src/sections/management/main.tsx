'use client';

import useAuth from '@/hooks/use-auth';
import withRole from '@/hocs/with-role.hoc';
import { UserRoleEnum } from '@/enums/role.enum';
import { adminRoutes, editorRoutes } from '@/layouts/management-layout/links';
import { Button, SimpleGrid, Text } from '@chakra-ui/react';
import Iconify from '@/components/iconify';

function ManagementPageMainSection() {
  const { user } = useAuth();
  return (
    <SimpleGrid
      spacing={4}
      columns={{
        base: 1,
        sm: 2,
        md: 4,
      }}
      textAlign="center"
    >
      {editorRoutes.map(({ path, icon, label }) => (
        <Button
          size="md"
          py={2}
          key={`management-route-${path}`}
          as="a"
          href={path}
          flexDirection="column"
          height="100%"
          width="100%"
        >
          <Iconify icon={icon} boxSize={10} />
          <Text>{label}</Text>
        </Button>
      ))}
      {user?.role === UserRoleEnum.ADMIN &&
        adminRoutes.map(({ path, icon, label }) => (
          <Button
            size="md"
            py={2}
            key={`management-route-${path}`}
            as="a"
            href={path}
            flexDirection="column"
            height="100%"
            width="100%"
          >
            <Iconify icon={icon} boxSize={10} />
            <Text>{label}</Text>
          </Button>
        ))}
    </SimpleGrid>
  );
}

export default withRole(ManagementPageMainSection, UserRoleEnum.EDITOR);
