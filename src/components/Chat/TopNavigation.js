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
import {RiSettings5Fill} from 'react-icons/ri'
  import useDarkMode from '../../hooks/useDarkMode';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const TopNavigation = ({activeServer, channelName, setConfigOpen}) => {
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

/*----------------------------CONFIG MENU POPUP----------------------------*/
const ServerConfigIcon = () => <span onClick={openMenu}><RiSettings5Fill size='24' className='top-navigation-icon'/></span>

const openMenu = () => {
  if(activeServer.id !== "GlobalServer") setConfigOpen(true);

};

/*----------------------------INFO DEL SERVER----------------------------*/
const InfoCircle = () => <span onClick={getServerInfo}><FaInfoCircle size='24' className='top-navigation-icon'/></span>;
function getServerInfo(){
  if(!activeServer) {return;}
  //Prompt 
  Swal.fire({   
    //Estilo
    background: '#2d3748',
    color:'#a0aec0',
    confirmButtonColor: '#48bb78',
    cancelButtonColor: '#718096',
    //Datos
    title: 'Info',
    text: 
    `ID:    ${activeServer.id} |
      Name:  ${activeServer.name} |   
      Code:  ${activeServer.code}`, 
    })
}
/*-----------------------------------------------------------*/

  return (
  <div className="top-navigation bg-base-100 dark:bg-gray-800 z-10">
    <div className="w-screen">
      <label tabIndex={0} className=""> {/*esto antes era: sm:hidden */}
        <LeftMenuIcon />
      </label>
      <p className="btn btn-ghost normal-case text-xl"><Title text={title} /></p>
      <div className="dropdown p-0 flex flex-row-reverse mr-5">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <RightMenuIcon />
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box dark:bg-gray-800 top-12">
        <li><ThemeIcon /></li>
       {/* <li><UserCircle /></li>*/}
        <li><InfoCircle /></li>
        <li><ServerConfigIcon/></li>
        </ul>
      </div>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><ThemeIcon /></li>
       {/* <li><UserCircle /></li>*/}
        <li><InfoCircle /></li>
        <li><ServerConfigIcon/></li>
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
const Title = ({text}) => <h5 className='title-text'>{text}</h5>;

export default TopNavigation;
  