
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
  onSnapshot
} from "firebase/firestore";

import TopNavigation from './TopNavigation';
import { BsPlusCircleFill } from 'react-icons/bs';
import { act } from "react-dom/test-utils";

/*----------CHAT, INPUT Y NAVBAR (TopNavigation) -----------*/
const ContentContainer = ({activeServer, activeChannel}) => {
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
      scroll.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    });
    return () => unsubscribe;
  }, [activeChannel, activeServer]);


  return (
    <div className='content-container h-screen overflow-y-auto '>
      <TopNavigation activeServer={activeServer} channelName={activeChannel} />
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

  //Funcion
  const sendMessage = async (event) => {
    event.preventDefault();

    //chequea si el mensaje esta vacio
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    //Consigue los datos del usuario logueado (id, nombre, foto)
    const { uid, displayName, photoURL } = auth.currentUser;

    //Fecha de creación del mensaje
    const date = new Date().getTime();

    //Establecer la ruta del mensaje a una variable
    const docRef = doc(db, `/servers/${activeServer.id}/channels/${channelName}/messages/${date}`);

    //Setear documento (mensaje) en la base de datos (firestore)
    setDoc(docRef, {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      id: date,
    })

    //vaciar el input
    setMessage("");
  };

  return (
    <div className='bottom-bar'>
    <button onClick={()=>""}><PlusIcon /></button>
    <form onSubmit={(event) => sendMessage(event)} className="w-full">
      <input
        disabled = {channelName ? false : true}
        id="messageInput"
        name="messageInput"
        type="text"
        className='bottom-bar-input'
        placeholder={`Enviar mensaje a #${channelName}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  </div>
  );

};


/*----------------MENSAJE----------------*/

const Message = ({ message }) => {

  const [user] = useAuthState(auth);

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
    <div className="chat-bubble dark:bg-gray-600 break-words text-start">{message.text}</div>
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
