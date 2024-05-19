import { Link, Outlet } from 'react-router-dom';

import { BackgroundContainer, HeaderContainer, HeaderContainerInner } from './tailwind-containers';

export default function App() {
  return (
  <BackgroundContainer >
    <HeaderContainer>
      <HeaderContainerInner>
        <div>
          <Link to="/dashboard/articles/" >
            <h1 id="main-title" className="relative font-jaro inset-y-4 inset-x-3 text-2xl sm:inset-x-5 sm:text-4xl font-black text-white">The</h1>
            <h1 id="main-title" className="text-2xl font-jaro sm:text-4xl font-black text-white">Guardian</h1>
          </Link>
        </div>
        <ul className="list flex items-center gap-2.5 sm:gap-5 font-bold sm:text-xl text-slate-100">
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
      </HeaderContainerInner>
    </HeaderContainer>
    <div className="grid justify-center max-w-full">
      <Outlet />
    </div>
    <footer className="flex px-3 justify-between items-center rounded-lg shadow m-4 bg-blue-950 text-white sm:px-5">
      <div>
        <a href="https://github.com/louispallett/odin-blog-api">
          <h2 className="text-sm">© 2024 LowPal, The Odin Project</h2>
        </a>
      </div>
      <Link to="/dashboard/writeforus" className="py-5 hover:text-yellow-400">
          <p className="font-bold">Write For Us</p>
      </Link>
    </footer>
  </ BackgroundContainer>
  );
};
