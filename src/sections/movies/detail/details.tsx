import Iconify from '@/components/iconify';
import Image from '@/components/image';
import { MoviePersonType } from '@/types/movie-person.type';
import getCDNPath from '@/utils/get-cdn-path.util';
import { Box, Card, CardBody, Heading, Text } from '@chakra-ui/react';
import Slider, { Settings as SlickSettings } from 'react-slick';

const slickSettings: SlickSettings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: true,
  prevArrow: (
    <Iconify
      icon="gravity-ui:chevron-left"
      color="black"
      transition={'all 0.2s ease-in-out'}
      _hover={{
        color: 'gray.500',
        transition: 'all 0.2s ease-in-out',
      }}
    />
  ),
  nextArrow: (
    <Iconify
      icon="gravity-ui:chevron-right"
      color="black"
      transition={'all 0.2s ease-in-out'}
      _hover={{
        color: 'gray.500',
        transition: 'all 0.2s ease-in-out',
      }}
    />
  ),
};

type Props = {
  moviePersons: MoviePersonType[];
};

export default function DetailsSection({ moviePersons }: Props) {
  return (
    <Box>
      <Heading>People</Heading>
      <Box my={4}>
        <Slider {...slickSettings}>
          {moviePersons.map(({ person, personTypes, roleName }) => (
            <div key={`movie-person-${person.id}`}>
              <Card maxW="3xs" mx={1}>
                <Image src={getCDNPath(person?.photoFile?.path)} />
                <CardBody>
                  <Text>{person?.firstName + ' ' + person?.lastName}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {personTypes.map(({ name }) => name).join(', ')}
                  </Text>
                  <Text fontStyle="italic" fontSize="sm">
                    {roleName}
                  </Text>
                </CardBody>
              </Card>
            </div>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}
