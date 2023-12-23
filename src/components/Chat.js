import { useState } from 'react';
import './../styles/App.css';
import './../styles/index.css';
import Sidebar from './Chat/Sidebar';
import ChannelBar from './Chat/ChannelBar';
import ContentContainer from './Chat/ContentContainer';
import ServerConfigPopup from './Chat/ServerConfigPopup';


import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

//Chat
function Chat({user}) {
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeServer, setActiveServer] = useState(null);
  const [isConfigOpen, setConfigOpen] = useState(false);

  setUser(user);

  return (
    <div className="flex">
      {/*Chat*/}
      <Sidebar user={user} setActiveServer={setActiveServer} isConfigOpen={isConfigOpen} setActiveChannel={setActiveChannel}/>
      <ChannelBar activeServer={activeServer} setActiveChannel={setActiveChannel}/>
      <ContentContainer activeServer={activeServer} activeChannel={activeChannel} setConfigOpen={setConfigOpen} />
      {/*Menu desplegable*/}
      <ServerConfigPopup activeServer={activeServer} isConfigOpen={isConfigOpen} setConfigOpen={setConfigOpen} user={user}/>
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
