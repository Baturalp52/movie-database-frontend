import { Container } from "@chakra-ui/react";
import MainHeader from "./header";
import MainFooter from "./footer";

type Props = { children: React.ReactNode };

export default function MainLayout({ children }: Props) {
  return (
    <>
      <MainHeader />
      <Container>{children}</Container>
      <MainFooter />
    </>
  );
}
