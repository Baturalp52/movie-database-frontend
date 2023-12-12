export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  USER: {
    ROOT: '/users',
    DETAIL: (userId: number) => `/users/${userId}`,
  },
  SETTINGS: { ROOT: '/profile', SETTINGS: '/profile/settings' },
  MOVIES: '/movies',
  PEOPLE: '/people',
  MOVIE: (movieId: number) => `/movie/${movieId}`,
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
