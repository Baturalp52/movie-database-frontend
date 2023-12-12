import { ROUTES } from '@/utils/routes';

export const editorRoutes = [
  { path: ROUTES.MANAGEMENT.MOVIES, label: 'Movies', icon: 'tabler:movie' },
  {
    path: ROUTES.MANAGEMENT.MOVIE_REQUESTS,
    label: 'Movie Requests',
    icon: 'carbon:request-quote',
  },
  { path: ROUTES.MANAGEMENT.PEOPLE, label: 'People', icon: 'bi:people-fill' },
];
export const adminRoutes = [
  {
    path: ROUTES.MANAGEMENT.USERS,
    label: 'Users',
    icon: 'teenyicons:users-solid',
  },
  {
    path: ROUTES.MANAGEMENT.PERSON_TYPES,
    label: 'Person Types',
    icon: 'fluent:person-tag-24-filled',
  },
  {
    path: ROUTES.MANAGEMENT.SOCIAL_LINKS,
    label: 'Social Links',
    icon: 'ion:share-social',
  },
  { path: ROUTES.MANAGEMENT.GENRES, label: 'Genres', icon: 'ic:round-tag' },
];
