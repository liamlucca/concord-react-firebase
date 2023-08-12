import { useEffect, useState } from 'react';
import { BsPlus, BsFillLightningFill, BsGearFill } from 'react-icons/bs';
import { FaFire, FaPoo } from 'react-icons/fa';

import { db } from "../../firebase";
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

import ChannelBar, { getChannels } from './ChannelBar';

const SideBar = ({setActiveServer}) => {

  //Lista de servers
  const [serversList, setServersList] = useState([]);

  //Obtener los servers
  async function getServers(){
    const serversArray = [];
    const collectionRef = collection(db, "servers"); //Obtenemos la coleccion "servers" que tenemos en firebase
    const encryptedServers = await getDocs(collectionRef); //Obtenemos todos los documentos que estan adentro de la coleccion "servers"
    encryptedServers.forEach(encryptedServers=>{
      serversArray.push(encryptedServers.data()); //Guardamos cada canal adentro del array "serversArray"
    });
    //Guardamos el array de servers en el estado
    setServersList(serversArray);
  }

  //Llamamos a la función con useEffect 
  useEffect(()=> {
    getServers();
  }, [])

  //CREAR UN SERVIDOR
  function addServer(){
    const newName = prompt("Crear nombre del servidor");
    const newCode = prompt("Crear código del servidor");
    const date = new Date().getTime();
    const id = `${newName}_${date}`;

    //Ruta del servidor
    const docRef = doc(db, `servers/${id}`);

    setDoc(docRef, {
      id: id,
      name: newName,
      code: newCode,
    })

    getServers();
  }

  return (
    <div className="left-side fixed top-0 left-0 h-screen w-16 sm:flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg z-10 overflow-y-auto overflow-x-hidden"> {/*Responsive: hidden sm-flex*/}
                    
        <DefaultIcon icon={<FaFire size="28" />} />
        <Divider />
        <DefaultIcon icon={<BsPlus size="32" onClick={addServer}/>}/>

        {/*----Mapeo de los servers----*/}
        {serversList &&
          serversList.map((server) => <ServerIcon setActiveServer={setActiveServer} id={server.id} text={server.name} />) /*FALTA EL ICON*/}

        <DefaultIcon icon={<BsFillLightningFill size="20" />} />
        <DefaultIcon icon={<FaPoo size="20" />} />
        <Divider />
        <DefaultIcon icon={<BsGearFill size="22"/>} />
    </div>
  );
};

//Icono del sidebar de los servidores de los usuarios
const ServerIcon = ({setActiveServer, id, icon, text = 'tooltip 💡'}) => (
  <div onClick={() => setActiveServer(id)} className="sidebar-icon group min-h-12">  {/*---Seleccionar canal---*/}
    {icon}
    <span class="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
); 

//Icono del sidebar nativo de la app, por ejemplo (boton para añadir servidores, configuracion, etc)
const DefaultIcon = ({icon, text = 'tooltip 💡'}) => (
  <div className="sidebar-icon group min-h-12">  {/*---Seleccionar canal---*/}
    {icon}
    <span class="sidebar-tooltip group-hover:scale-100">
      {text}
    </span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
