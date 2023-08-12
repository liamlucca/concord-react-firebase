import { useState } from 'react';
import './../styles/App.css';
import './../styles/index.css';
import Sidebar from './Chat/Sidebar';
import ChannelBar from './Chat/ChannelBar';
import ContentContainer from './Chat/ContentContainer';

function Chat() {
  const [activeChannel, setActiveChannel] = useState(null);
  const [activeServer, setActiveServer] = useState(null);

  return (
    <div className="flex">
      <Sidebar setActiveServer={setActiveServer}/>
      <ChannelBar activeServer={activeServer} setActiveChannel={setActiveChannel}/>
      <ContentContainer activeChannel={activeChannel} activeServer={activeServer} />
    </div>
  );
}

export default Chat;
