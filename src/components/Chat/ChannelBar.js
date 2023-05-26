import { useEffect, useState } from 'react';
import { BsHash } from 'react-icons/bs';
import { FaChevronDown, FaChevronRight, FaPlus } from 'react-icons/fa';

import { auth, db } from "../../firebase";
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

const topics = ['tailwind-css', 'react'];
const questions = ['jit-compilation', 'purge-files', 'dark-mode'];
const random = ['variants', 'plugins'];

const ChannelBar = ({setActiveChannel}) => {
  //Usuario logueado
  const { displayName, photoURL } = auth.currentUser;

  //Estado de los canales
  const [channelsList, setChannelsList] = useState([]);

  //Obtener los canales
  async function getChannels(){
    const channelsArray = [];
    const collectionRef = collection (db, "channels"); //Obtenemos la coleccion "channels" que tenemos en firebase
    const encryptedChannels = await getDocs(collectionRef); //Obtenemos todos los documentos que estan adentro de la coleccion "channels"
    encryptedChannels.forEach(encryptedChannel=>{
      channelsArray.push(encryptedChannel.data()); //Guardamos cada canal adentro del array "channelsArray"
    });
    //Guardamos el array de canales en el estado
    setChannelsList(channelsArray);
}

  //Agregar canal
  function addChannel(){
    const channelName = prompt("Inserte nombre del canal");
    if(channelName){
      //La ruta en la base de datos del firebase
      const docRef = doc(db, `channels/${channelName}`);
      //Se agrega el canal a la base de datos de firebase
      setDoc(docRef, {
        id: new Date().getTime(),
        name: channelName,
      });
      //Se actualizan los canales
      getChannels();
    }
  }

  //Llamamos a la función con useEffect
  useEffect(()=> {
    getChannels();
  }, [])

  return (
    <div className='left-side channel-bar shadow-lg h-screen overflow-auto overflow-x-hidden sm:flex'>  {/*Responsive: hidden sm-flex*/}
      <div className='channel-container'>
        <ChannelBlock />
        {/*Secciones con los canales*/}
        <Dropdown header='Topics' channels={channelsList} addChannel={addChannel} selectChannel={setActiveChannel}/>
      </div>
      {/*Usuario Logueado*/}
      <UserBlock displayName={displayName} photoURL={photoURL} />
    </div>
  );
};

//----------------SECCIÓN DE CANALES-------------------1
const Dropdown = ({ header, channels, addChannel, selectChannel }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className='dropdown'>
      <div onClick={() => setExpanded(!expanded)} className='dropdown-header'>
        <ChevronIcon expanded={expanded} />
        <h5
          className={expanded ? 'dropdown-header-text-selected' : 'dropdown-header-text'}
        >
          {header}
        </h5>
        <FaPlus size='12' className='text-accent text-opacity-80 my-auto ml-auto' 
        onClick={addChannel}/>
      </div>
      {/*----Mapeo de los canales----*/}
      {expanded &&
        channels &&
        channels.map((channel) => <TopicSelection name={channel.name} select={selectChannel} />)}
    </div>
  );
};
//-------------------------------------------

const ChevronIcon = ({ expanded }) => {
  const chevClass = 'text-accent text-opacity-80 my-auto mr-1';
  return expanded ? (
    <FaChevronDown size='14' className={chevClass} />
  ) : (
    <FaChevronRight size='14' className={chevClass} />
  );
};

//----------------CANAL-------------------2
const TopicSelection = ({ name, select }) => (
  <div className='dropdown-selection'
  onClick={() => select(name)}>  {/*---Seleccionar canal---*/}
    <BsHash size='24' className='text-gray-400' />
    <h5 className='dropdown-selection-text'>{name}</h5>
  </div>
);
//-------------------------------------------

const ChannelBlock = () => (
  <div className='channel-block'>
    <h5 className='channel-block-text'>Channels</h5>
  </div>
);

//----------------USUARIO LOGUEADO-------------------

const UserBlock = ({displayName, photoURL}) => (
  <div className='user-block'>
  <div className="avatar online">
    <div className="w-24 rounded-full">
      <img src={photoURL} />
      {/*<img src="https://preview.redd.it/ogiglyr165p91.png?auto=webp&s=10efe64832620088452adccd502fc04b3eaac3e4" />*/}
    </div>
  </div>

  <h5 className='channel-block-text'>{displayName}</h5>

  </div>
);

//-------------------------------------------


export default ChannelBar;
