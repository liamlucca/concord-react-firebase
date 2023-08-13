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
    FaInfoCircle,
  } from 'react-icons/fa';
  import useDarkMode from '../../hooks/useDarkMode';
import { useState, useEffect } from 'react';
  

  const TopNavigation = ({activeServer, channelName}) => {

    //Titulo del chat (canal)
    const [title, setTitle] = useState(channelName);

    //Actualizar el "Titulo del chat" al cambiar de servidor
    useEffect(
      ()=> setTitle(""), [activeServer]
      );

    //Actualizar el "Titulo del chat" al cambiar de canal
    useEffect(
      ()=> setTitle(channelName), [channelName]
      );    

    //Botón y función para obtener la info del server
    const InfoCircle = () => <span><FaInfoCircle size='24' className='top-navigation-icon' onClick={getServerInfo}/></span>;
    function getServerInfo(){
      if(!activeServer) {return;}
      alert(      
        `
         ID:    ${activeServer.id} \n
         Name:    ${activeServer.name} \n
         Code:  ${activeServer.code}
         `
         );
    }

    return (
    <div className="top-navigation bg-base-100 dark:bg-gray-800">
      <div className="w-screen">
        <label tabIndex={0} className=""> {/*esto antes era: sm:hidden */}
          <LeftMenuIcon />
        </label>
        <a className="btn btn-ghost normal-case text-xl"><Title text={title} /></a>
        <div className="dropdown p-0 flex flex-row-reverse mr-5">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <RightMenuIcon />
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box dark:bg-gray-800 top-12">
          <li><ThemeIcon /></li>
          <li><UserCircle /></li>
          <li><BellIcon /></li>
          <li><InfoCircle /></li>
          </ul>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><ThemeIcon /></li>
          <li><UserCircle /></li>
          <li><BellIcon /></li>
          <li><InfoCircle /></li>
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
     const [isHide, setIsHide] = useState(true);    
     const sideElements = document.getElementsByClassName('left-side');
     //Mostrar los menus izquierdos
     const enable = () => {
      Array.from(sideElements).forEach(element => { element.classList.add("flex", "transition-all", "duration-500")});
      setTimeout(function () { Array.from(sideElements).forEach(element => { element.classList.remove("left-side-menu-visually")}); }, 1);
      setTimeout(function () { Array.from(sideElements).forEach(element => { element.classList.remove("flex", "transition-all", "duration-500")}); }, 500);
    };
    //Esconder los menus izquierdos
    const disable = () => {
      setTimeout(function () {
        Array.from(sideElements).forEach(element => { element.classList.remove("flex", "transition-all", "duration-500")});
      }, 500);
      Array.from(sideElements).forEach(element => { element.classList.add("left-side-menu-visually")});
    }
    //Al cliquear el boton:
    const handleClick = () => 
    {
      setIsHide(!isHide);
      isHide ? disable() : enable() ;  
    }; 
    //Responsive
    /*useEffect(() => {
      function handleResize() {
        if (window.innerWidth < 640) {
          setIsHide(true);
          disable();  
          return (Button());
        } 
      }
      handleResize();
      window.addEventListener("resize", handleResize);
      });*/
    //Función a retornar del boton
    const Button = () => {
      return (
        <span onClick={handleClick}>{isHide ? (
          <FaAngleLeft size='24' className='top-navigation-icon'/>
        ) : (
          <FaAngleRight size='24' className='top-navigation-icon'/>
        )}
        </span>
      )
    }
    //Retornar
    return (Button());
}
  const RightMenuIcon = () => <span><FaAlignRight size='24' className='top-navigation-icon'/></span>
  const BellIcon = () => <span><FaRegBell size='24' className='top-navigation-icon' /></span>;
  const UserCircle = () => <span><FaUserCircle size='24' className='top-navigation-icon' /></span>;
  const HashtagIcon = () => <span><FaHashtag size='20' className='top-navigation-icon' /></span>;
  const Title = ({text}) => <h5 className='title-text'>{text}</h5>;
  
  export default TopNavigation;
  