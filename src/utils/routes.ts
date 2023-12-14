export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  USER: {
    ROOT: '/users',
    DETAIL: (userId: string) => `/users/${userId}`,
  },
  SETTINGS: { ROOT: '/profile', SETTINGS: '/profile/settings' },
  MOVIES: {
    ROOT: '/movies',
    SEARCH: (searchParams?: string) =>
      `/movies${searchParams ? `?${searchParams}` : ''}`,
    DETAIL: (movieId: string) => `/movies/${movieId}`,
  },
  PEOPLE: {
    ROOT: '/people',
    DETAIL: (personId: string) => `/people/${personId}`,
  },
  MANAGEMENT: {
    ROOT: '/management',
    USERS: '/management/users',
    MOVIES: '/management/movies',
    MOVIE_REQUESTS: '/management/movie-requests',
    PEOPLE: '/management/people',
    GENRES: '/management/genres',
    PERSON_TYPES: '/management/person-types',
    SOCIAL_LINKS: '/management/social-links',
  },
};
