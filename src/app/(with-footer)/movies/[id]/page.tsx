import MovieDetailMainSection from '@/sections/movies/detail/main';
import axiosInstanceSSR from '@/utils/axios-instance-ssr.util';
import getCDNPath from '@/utils/get-cdn-path.util';
import { ROUTES } from '@/utils/routes';
import { kebabCase } from 'change-case';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = Number(params.id.split('-').pop());
  if (isNaN(id)) notFound();

  // fetch data
  const movieRes: any = await axiosInstanceSSR.get(`/movies/${id}`);

  if (!movieRes.success) {
    notFound();
  }

  const { data: movie } = movieRes;

  return {
    title: movie?.title,
    description: movie?.summary,
    openGraph: {
      title: movie?.title,
      description: movie?.summary,
      type: 'video.movie',
      duration: movie?.runtime,
      releaseDate: movie?.releaseDate,
      actors: movie?.moviePersons.map(({ person, roleName }: any) => ({
        url: ROUTES.PEOPLE.DETAIL(
          kebabCase(person.firstName + ' ' + person.lastName + ' ' + person.id),
        ),
        role: roleName,
      })),
      images: [
        {
          url: getCDNPath(movie?.posterPhotoFile?.path ?? ''),
          width: 800,
          height: 600,
          alt: movie?.title,
        },
      ],
    },
  };
}

export default async function MovieDetailPage({ params }: Props) {
  const id = Number(params.id.split('-').pop());
  if (isNaN(id)) notFound();

  return <MovieDetailMainSection movieId={id} />;
}
