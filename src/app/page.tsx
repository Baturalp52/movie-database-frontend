import HomeExploreSection from '@/sections/home/explore';
import HomeTrendingMoviesSection from '@/sections/home/trending-movies';
import HomeWelcomeSection from '@/sections/home/welcome';

export default function Home() {
  return (
    <>
      <HomeWelcomeSection />
      <HomeTrendingMoviesSection />
      <HomeExploreSection />
    </>
  );
}
