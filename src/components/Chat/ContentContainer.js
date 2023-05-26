
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import {
  addDoc,
  serverTimestamp,
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

import TopNavigation from './TopNavigation';
import { BsPlusCircleFill } from 'react-icons/bs';

const ContentContainer = () => {

  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe;
  }, []);


  return (
    <div className='content-container h-screen overflow-y-auto '>
      <TopNavigation />
      <div className='ml-5 mt-20 mb-14'>

      {/*----------MENSAJES----------*/}
      {messages?.map((message) => (
          <Post key={message.id} message={message} />
        ))}
      {/*-----------------------------*/}

      </div>
      <span ref={scroll}></span>
      <SendMessageBar />
    </div>
  );
};

/*---------------INPUT PARA ENVIAR MENSAJES----------------*/

const SendMessageBar = ({ scroll }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event) => {
    event.preventDefault();

    //chequea si el mensaje esta vacio
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    //consigue los datos del usuario logueado (id, nombre, foto)
    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className='bottom-bar'>
    <PlusIcon />
    <form onSubmit={(event) => sendMessage(event)} className="w-full">
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className='bottom-bar-input'
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </form>
  </div>
  );

};


/*----------------MENSAJE----------------*/

const Post = ({ message }) => {

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
    <div className="chat-bubble dark:bg-gray-600">{message.text}</div>
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
