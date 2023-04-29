import {
    FaSearch,
    FaHashtag,
    FaRegBell,
    FaUserCircle,
    FaMoon,
    FaSun,
  } from 'react-icons/fa';
  import useDarkMode from '../hooks/useDarkMode';
  
  const TopNavigation = () => {
    return (
    <div className="top-navigation bg-base-100 dark:bg-gray-800">
      <div className="navbar-start">
        <div className="dropdown p-0">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box dark:bg-gray-800">
          <li><ThemeIcon /></li>
          <li><UserCircle /></li>
          <li><BellIcon /></li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl"><Title /></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><ThemeIcon /></li>
          <li><UserCircle /></li>
          <li><BellIcon /></li>
        </ul>
      </div>
    </div>
    );
  };
  
  const ThemeIcon = () => {
    const [darkTheme, setDarkTheme] = useDarkMode();
    const handleMode = () => setDarkTheme(!darkTheme);
    return (
      <span onClick={handleMode}>
        {darkTheme ? (
          <FaSun size='24' className='top-navigation-icon' />
        ) : (
          <FaMoon size='24' className='top-navigation-icon' />
        )}
      </span>
    );
  };
  
  const Search = () => (
    <div className='search'>
      <input className='search-input' type='text' placeholder='Search...' />
      <FaSearch size='18' className='text-secondary my-auto' />
    </div>
  );
  const BellIcon = () => <span><FaRegBell size='24' className='top-navigation-icon' /></span>;
  const UserCircle = () => <span><FaUserCircle size='24' className='top-navigation-icon' /></span>;
  const HashtagIcon = () => <span><FaHashtag size='20' className='top-navigation-icon' /></span>;
  const Title = () => <h5 className='title-text'>tailwind-css</h5>;
  
  export default TopNavigation;
  