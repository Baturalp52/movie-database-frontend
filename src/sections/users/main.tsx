'use client';

import LoadingLogo from '@/components/loading-logo';
import useFetch from '@/hooks/use-fetch';
import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { useCallback } from 'react';
import UserBannerSection from './banner';
import DetailsSection from './details/details';
import SideInfoSection from './side-info';
import UsersService from '@/services/users/users.service';

type Props = {
  userId: number;
};

export default function UserDetailMainSection({ userId }: Props) {
  const fetchUser = useCallback(
    async () => UsersService.getUser(userId),
    [userId],
  );

  const { data, loading } = useFetch(fetchUser);

  if (loading)
    return (
      <Box width="100%" height="100%">
        <Center w="100%" h="100%">
          <LoadingLogo />
        </Center>
      </Box>
    );

  if (!data) {
    return null;
  }

  return (
    <Box my={4}>
      <UserBannerSection user={data} />
      <Grid templateColumns="repeat(4,1fr)" gap={4} p={4}>
        <GridItem colSpan={3}>
          <DetailsSection user={data} />
        </GridItem>
        <GridItem>
          <SideInfoSection user={data} />
        </GridItem>
      </Grid>
    </Box>
  );
}
