import { Link, Outlet } from 'react-router-dom';

import { BackgroundContainer, BoxContainer, HeaderContainer } from './tailwind-containers';

export default function App() {
  return (
  <BackgroundContainer >
    <HeaderContainer>
      <div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">The Guardian</h1>
        <a href="https://github.com/louispallett/odin-blog-api" className="flex justify-start items-center gap-2.5 mt-2.5">
          <img src="/assets/images/github.svg" alt="The logo of GitHub - an 'octocat' with five tenticles upon a white background." className="hidden sm:block h-5" />
          <h2 className="text-xs sm:text-sm text-white">by LowPal</h2>
        </a>
      </div>
      <ul className="list none flex flex-col sm:flex-row items-center gap-1 sm:gap-5 font-bold text-xl text-yellow-500">
        <Link to="/users/sign-up">
          <li>Sign up</li>
        </Link>
      </ul>
    </HeaderContainer>
    <Outlet />
  </ BackgroundContainer>
  );
};
