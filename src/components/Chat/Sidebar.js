import { useEffect, useState } from 'react';
import { BsPlus, BsWechat } from 'react-icons/bs';
import { HiUserGroup } from 'react-icons/hi'

import { db } from "../../firebase";

import { doc, setDoc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import Swal from 'sweetalert2';

const SideBar = ({user, setActiveServer, isConfigOpen, setActiveChannel}) => {

  //Lista de servers
  const [serversList, setServersList] = useState([]);

  //Unir al servidor global
  ActivateGlobalServer(setActiveServer, setServerInUser, setActiveChannel);

  //Obtener los servers
  async function getServers(){
    const serversArray = [];
    const joinedServersArray = [];
    //Obtenemos la coleccion "servers" que tenemos en firebase
    const serversRef = collection(db, "servers"); 
    const joinedServers =  await getDocs(collection(db, `users/${user.uid}/joinedServers`)); //Si Funciona
    //Metemos a los servidores unidos (data) en el array
    joinedServers.forEach(joinedServer=>{
      joinedServersArray.push(joinedServer.data().id); //Guardamos cada canal adentro del array "joinedServersArray"
    });
    // Consulta para obtener los servidores a los que el usuario está unido
    const q = query(serversRef, where('id', 'in', joinedServersArray)); //No funciona, está vacio
    const encryptedServers = (await getDocs(q));
    //Metemos los servidores (data) en el array
    encryptedServers.forEach(server=>{
      serversArray.push(server.data()); //Guardamos cada canal adentro del array "serversArray"
    });
    //Guardamos el array de servers en el estado
    setServersList(serversArray);
  }

  //Llamamos a la función con useEffect 
  useEffect(()=> {
    getServers(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Actualizar los servers si se cierra la ventana de configuracion
  useEffect(()=> {
    getServers(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConfigOpen]);

  //CREAR UN SERVIDOR (botón)
  async function addServer(){

    //Prompt 1
    const {value: newName} = await Swal.fire({
      //Estilo
      background: '#2d3748',
      color:'#48bb78',
      confirmButtonColor: '#48bb78',
      cancelButtonColor: '#718096',
      //Datos
      title: 'Crear nombre del servidor',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    });

    if(!newName) {return;}
    
    //Prompt 2
    const {value: newCode} = await Swal.fire({   
      //Estilo   
      background: '#2d3748',
      color:'#48bb78',
      confirmButtonColor: '#48bb78',
      cancelButtonColor: '#718096',
      //Datos
      title: 'Escribir una contraseña para el servidor',
      input: 'text',
      confirmButtonText: 'Ok',
    });

    //Id
    const date = new Date().getTime();
    const unmodifiedId = `${newName}_${date}`;
    const id = unmodifiedId.replaceAll(' ', ''); 


    //Prompt 3
    /*const {value: image} = await Swal.fire({   
      //Estilo   
      background: '#2d3748',
      color:'#48bb78',
      confirmButtonColor: '#48bb78',
      cancelButtonColor: '#718096',
      //Datos
      title: 'Subí una imagen para el servidor',
      input: 'file',
      showCancelButton: false,
      confirmButtonText: 'Listo',
    });                   */
     //Imagen
     let iconUrl = "";    /*
    if(image){
      const imageRef = ref(storage, `servers/${id}/config/logo`);   
      const metadata = {
        contentType: image.type,
      };   
      uploadBytes(imageRef, image, metadata);
      try{
      iconUrl = await getDownloadURL(ref(storage, `servers/${id}/config/logo`)).then((data) =>  { return data })}
      catch(error){console.error("Error al cargar la imagen del servidor")}
    };                      */

    //Ruta del servidor
    const docRef = doc(db, `servers/${id}`);
    const docData = {
      id: id,
      name: newName,
      code: newCode,
      iconUrl: iconUrl
    }

    setDoc(docRef, docData);
    setServerInUser(docData.id);
    getServers();
  }



  //UNIRSE A UN SERVIDOR (botón)
  async function joinServer(){

    const {value: id} = await Swal.fire({
      //Estilo   
      background: '#2d3748',
      color:'#48bb78',
      confirmButtonColor: '#48bb78',
      cancelButtonColor: '#718096',
      //Datos
      title: 'Introducir id del servidor',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    });

    if(!id) return;
    
    const {value: code} = await Swal.fire({
      //Estilo   
      background: '#2d3748',
      color:'#48bb78',
      confirmButtonColor: '#48bb78',
      cancelButtonColor: '#718096',
      //Datos
      title: 'Introducir contraseña del servidor',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Ok',
    });

    try {
      const serverDocRef = doc(db, 'servers', id);
      const serverDoc = await getDoc(serverDocRef);
      if (serverDoc.exists()) {
        const serverCode = serverDoc.data().code;
        if (serverCode === code){
          setServerInUser(id);
          getServers();
        }
      }
    }
    catch (error) {
       console.error('Error al unirse al servidor:', error);
    }
  }

  //Unir al usuario a un servidor por la id
  function setServerInUser(joinServerId){
    const docRef = doc(db, `users/${user.uid}/joinedServers/${joinServerId}`);
    setDoc(docRef,{id: joinServerId});
  }

  return (
    <div className="left-side fixed top-0 left-0 h-screen w-16 sm:flex flex-col
                  bg-white dark:bg-gray-900 shadow-lg overflow-y-auto overflow-x-hidden"> {/*Responsive: hidden sm-flex*/}
                    
        <DefaultIcon icon={<BsWechat size="28" />} />
        <Divider />

        {/*----Mapeo de los servers----*/}
        {serversList &&
          serversList.map((server) => <ServerIcon setActiveServer={setActiveServer} serverData={server}/>) /*FALTA EL ICON*/}

        {/*<DefaultIcon icon={<FaPoo size="20" />} />*/}
        <Divider />
        {/*<DefaultIcon icon={<BsGearFill size="22"/>} />*/}

        <DefaultIcon icon={<BsPlus size="32" onClick={addServer}/>}/> {/*Crear servidor*/}
        <DefaultIcon icon={<HiUserGroup size="20" onClick={joinServer} />} /> {/*Unirse a un servidor*/}
    </div>
  );
};

//Icono del sidebar de los servidores de los usuarios
const ServerIcon = ({setActiveServer, serverData}) => (
  <div onClick={() => {setActiveServer(serverData)}} className="sidebar-icon group min-h-12">  {/*---Seleccionar canal---*/}

      {serverData.iconUrl ? (
        <img alt={serverData.name} src={serverData.iconUrl } className='sidebar-icon aspect-square'/> 
      ) : (
        serverData.name[0].toUpperCase()
      )}

    <span class="sidebar-tooltip group-hover:scale-100">
      {serverData.name}
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


function ActivateGlobalServer(setActiveServer, setServerInUser, setActiveChannel){
  const globalServerId = 'GlobalServer'; // El ID del servidor global en Firebase
  const serverGlobalRef = doc(db, 'servers', globalServerId); // Reemplaza 'servers' por tu colección
  setServerInUser(globalServerId);
  useEffect(() => {
    (async () => {
      try {
        const serverDoc = await getDoc(serverGlobalRef);
        if (serverDoc.exists()) {
          const serverData = serverDoc.data();
          setActiveServer(serverData);
          setActiveChannel("general");
        }
      } catch (error) {
        console.error('Error al cargar el servidor global:', error);
      }
    })();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
}

export default SideBar;
