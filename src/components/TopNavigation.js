import {
    FaSearch,
    FaHashtag,
    FaRegBell,
    FaUserCircle,
    FaMoon,
    FaSun,
    FaAngleRight,
    FaAngleLeft,
    FaAlignRight,
  } from 'react-icons/fa';
  import useDarkMode from '../hooks/useDarkMode';
import { useState } from 'react';
  
  const TopNavigation = () => {
    return (
    <div className="top-navigation bg-base-100 dark:bg-gray-800">
      <div className="w-screen">
        <label tabIndex={0} className="sm:hidden">
          <LeftMenuIcon />
        </label>
        <a className="btn btn-ghost normal-case text-xl"><Title /></a>
        <div className="dropdown p-0 flex flex-row-reverse mr-5">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <RightMenuIcon />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box dark:bg-gray-800 top-12">
          <li><ThemeIcon /></li>
          <li><UserCircle /></li>
          <li><BellIcon /></li>
          </ul>
        </div>
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

  const LeftMenuIcon = () => {
     const [enabled, setEnabled] = useState(false);    
     const handleClick = () => {
      const sideElements = document.getElementsByClassName('left-side');
      Array.from(sideElements).forEach(element => {
        element.classList.toggle("left-side-menu-active")
      });
      setEnabled(!enabled);
    }; 
    return (
      <span onClick={handleClick}>{enabled ? (
        <FaAngleLeft size='24' className='top-navigation-icon'/>
      ) : (
        <FaAngleRight size='24' className='top-navigation-icon'/>
      )}
      </span>
    );
}

  const RightMenuIcon = () => <span><FaAlignRight size='24' className='top-navigation-icon'/></span>
  const BellIcon = () => <span><FaRegBell size='24' className='top-navigation-icon' /></span>;
  const UserCircle = () => <span><FaUserCircle size='24' className='top-navigation-icon' /></span>;
  const HashtagIcon = () => <span><FaHashtag size='20' className='top-navigation-icon' /></span>;
  const Title = () => <h5 className='title-text'>tailwind-css</h5>;
  
  export default TopNavigation;
  