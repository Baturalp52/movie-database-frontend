export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  MOVIES: '/movies',
  PEOPLE: '/people',
  MOVIE: (movieId: number) => `/movie/${movieId}`,
};
