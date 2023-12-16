import UserDetailMainSection from '@/sections/users/main';
import axiosInstanceSSR from '@/utils/axios-instance-ssr.util';
import getCDNPath from '@/utils/get-cdn-path.util';
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

  const userRes: any = await axiosInstanceSSR.get(`/users/${id}`);
  if (!userRes?.success) {
    notFound();
  }

  const { data: user } = userRes;

  return {
    title:
      user?.firstName && user?.lastName
        ? `${user?.firstName} ${user?.lastName}`
        : user?.detail?.username,
    description: user?.bio,
    openGraph: {
      title:
        user?.firstName && user?.lastName
          ? `${user?.firstName} ${user?.lastName}`
          : user?.detail?.username,
      description: user?.bio,
      type: 'profile',
      images: [
        {
          url: getCDNPath(user?.posterPhotoFile?.path ?? ''),
          width: 800,
          height: 600,
          alt: user?.title,
        },
      ],
      firstName: user?.firstName,
      lastName: user?.lastName,
      username: user?.detail?.username,
    },
  };
}

export default async function UserDetailPage({ params }: Props) {
  const id = Number(params.id.split('-').pop());
  if (isNaN(id)) notFound();

  return <UserDetailMainSection userId={id} />;
}
