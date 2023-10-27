
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, app } from "../../firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import {getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage" 

import TopNavigation from './TopNavigation';
import { BsPlusCircleFill } from 'react-icons/bs';
import { act } from "react-dom/test-utils";

const storage = getStorage();

/*----------CHAT, INPUT Y NAVBAR (TopNavigation) -----------*/
const ContentContainer = ({activeServer, activeChannel, setConfigOpen}) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    if(!activeServer) {return;}
    //Buscamos los mensajes en la ruta y los ordenamos por la fecha
    const q = query(
      collection(db, `/servers/${activeServer.id}/channels/${activeChannel}/messages`), //servers/${activeServer.id}/channels/${activeChannel}/messages
      orderBy("createdAt")
    );            
    //  
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      //Mensajes
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
      //Scrollear para abajo
      try { scroll.current.scrollIntoView({behavior: "smooth",block: "end", inline: "nearest",});} catch(error) { }
    });
    return () => unsubscribe;
  }, [activeChannel, activeServer]);


  return (
    <div className='content-container h-screen overflow-y-auto'>
      <TopNavigation activeServer={activeServer} channelName={activeChannel} setConfigOpen={setConfigOpen} />
      <div className='ml-5 mt-20 mb-14'>

      {/*----------MENSAJES----------*/}
      {messages?.map((message) => (
          <Message message={message} />
        ))}
      {/*-----------------------------*/}

      </div>
      <span ref={scroll}></span>
      <SendMessageBar scroll={scroll} activeServer={activeServer} channelName={activeChannel} />
    </div>
  );
};

/*---------------INPUT PARA ENVIAR MENSAJES----------------*/

const SendMessageBar = ({ scroll, activeServer, channelName }) => {
  const [message, setMessage] = useState("");

  /*-----------ARCHIVOS-----------*/
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const storageRef = ref(storage, `/servers/${activeServer.id}/uploads/${channelName}/${file.name}_${new Date().getTime()}`);
        const snapshot = await uploadBytes(storageRef, file);

        const fileURL = await getDownloadURL(snapshot.ref);

        sendMessageWithFile(fileURL, file.type); 
      } catch (error) {
        console.error('Error al cargar el archivo:', error);
      }
    }
  };

  const sendMessageWithFile = async (fileUrl, fileType) => {
    const { displayName, photoURL } = auth.currentUser;
    const date = new Date().getTime();
    const docRef = doc(
      db,
      `/servers/${activeServer.id}/channels/${channelName}/messages/${date}`
    );

    await setDoc(docRef, {
      text: fileUrl,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      id: date,
      type: fileType, // Usar un campo "type" para el tipo de archivo
    });

    setMessage('');
  };

  /*--------------------------------*/

  const sendMessage = (event) => {
    event.preventDefault();

    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }

    const { displayName, photoURL } = auth.currentUser;
    const date = new Date().getTime();
    const docRef = doc(
      db,
      `/servers/${activeServer.id}/channels/${channelName}/messages/${date}`
    );

    setDoc(docRef, {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      id: date,
    });

    setMessage('');
  };

  return (
    <div className="bottom-bar">
      <button onClick={() => document.getElementById('fileInput').click()}>
        <PlusIcon />
      </button>
      <form onSubmit={sendMessage} className="w-full">
        <input
          disabled={channelName ? false : true}
          id="messageInput"
          name="messageInput"
          type="text"
          className="bottom-bar-input"
          placeholder={`Enviar mensaje a #${channelName}`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          id="fileInput"
          accept="image/*, audio/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </form>
    </div>
  );
};



/*----------------MENSAJE----------------*/

const Message = ({ message }) => {
  const [user] = useAuthState(auth);

  const isImage = message.type && message.type.startsWith('image/');
  const isAudio = message.type && message.type.startsWith('audio/');

  return (
    <div className={`chat chat-start chat-${message.uid === user.uid ? "start" : "start"} mb-3`}>
      <div className="chat-image">
        <div className="w-10 rounded-full">
          <img className='avatar-message' src={message.avatar} />
        </div>
      </div>
      <div className="chat-header">
        <b className='dark:text-gray-200'>{message.name}</b>
        <time className="text-xs opacity-50 ml-2 dark:text-gray-100">{message.serverTimestamp}</time>
      </div>
      {isImage ? (
        // Si el mensaje es una imagen, muestra la imagen en lugar del texto
        <div className="chat-bubble">
          <img src={message.text} alt="Imagen" className="rounded-md"/>
        </div>
      ) : isAudio ? (
        // Si el mensaje es un audio, muestra un reproductor de audio
        <div className="chat-bubble">
          <audio controls>
            <source src={message.text} type={message.type} />
          </audio>
        </div>
      ) : (
        // Si no es una imagen ni un audio, muestra el texto
        <div className="chat-bubble dark:bg-gray-600 break-words text-start">{message.text}</div>
      )}
    </div>
  );
};


/*---------------------------------------*/

const PlusIcon = () => (
  <BsPlusCircleFill
    size='22'
    className='text-green-500 dark:shadow-lg mx-2 dark:text-primary'
  />
);

export default ContentContainer;
