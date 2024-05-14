import { Link, Outlet } from 'react-router-dom';

import { BackgroundContainer, HeaderContainer } from './tailwind-containers';

export default function App() {
  return (
  <BackgroundContainer >
    <HeaderContainer>
      <div>
        <Link to="/dashboard/articles/" >
          <h1 id="main-title" className="relative font-jaro inset-y-4 inset-x-3 text-2xl sm:inset-x-5 sm:text-4xl font-black text-white">The</h1>
          <h1 id="main-title" className="text-2xl font-jaro sm:text-4xl font-black text-white">Guardian</h1>
        </Link>
      </div>
      <ul className="list none flex flex-col sm:flex-row items-center gap-1 sm:gap-5 font-bold text-xl text-slate-100">
        <Link to="/dashboard/articles" className="py-5 hover:text-yellow-400">
          <li>Home</li>
        </Link>
        <Link to="/dashboard/about" className="py-5 hover:text-yellow-400">
          <li>About</li>
        </Link>
        <Link to="/users/sign-up" className="py-5 hover:text-yellow-400">
          <li>Sign up</li>
        </Link>
      </ul>
    </HeaderContainer>
    <div className="grid justify-center max-w-full">
      <Outlet />
    </div>
    <footer className="rounded-lg shadow m-4 bg-blue-950 text-white">
      <div className="w-full mx-auto max-w-screen-xl p-4">
        <a href="https://github.com/louispallett/odin-blog-api" className="flex gap-2.5">
          <h2 className="text-sm">© 2024 LowPal, The Odin Project</h2>
        </a>
      </div>
    </footer>
  </ BackgroundContainer>
  );
};
