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
};
