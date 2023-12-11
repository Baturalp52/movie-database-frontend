import { Box } from '@chakra-ui/react';
import ProfileSidebar from './sidebar';

type Props = { children: React.ReactNode };

export default function MainProfileLayout({ children }: Props) {
  return (
    <Box p={4} gap={4} display="flex" justifyContent="space-between">
      <Box height="80vh" position="sticky" top={98}>
        <ProfileSidebar />
      </Box>
      <Box width="100%">{children}</Box>
    </Box>
  );
}
