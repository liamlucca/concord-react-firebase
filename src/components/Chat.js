import { useState } from 'react';
import './../styles/App.css';
import './../styles/index.css';
import Sidebar from './Chat/Sidebar';
import ChannelBar from './Chat/ChannelBar';
import ContentContainer from './Chat/ContentContainer';

import { db } from "../firebase";
import { doc, collection, setDoc } from "firebase/firestore";

//Chat
function Chat({user}) {
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeServer, setActiveServer] = useState(null);

  setUser(user);

  return (
    <div className="flex">
      <Sidebar user={user} setActiveServer={setActiveServer}/>
      <ChannelBar activeServer={activeServer} setActiveChannel={setActiveChannel}/>
      <ContentContainer activeServer={activeServer} activeChannel={activeChannel} />
    </div>
  );
}


//Poner los datos del user
function setUser(user){
  const docRef = doc(db, `users/${user.uid}`);
  setDoc(docRef, {
    id: user.uid,
    name: user.displayName,
  });
}

export default Chat;
