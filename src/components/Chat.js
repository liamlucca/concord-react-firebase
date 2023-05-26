import { useState } from 'react';
import './../styles/App.css';
import './../styles/index.css';
import Sidebar from './Chat/Sidebar';
import ChannelBar from './Chat/ChannelBar';
import ContentContainer from './Chat/ContentContainer';

function Chat() {
  const [activeChannel, setActiveChannel] = useState(null);
  console.log(setActiveChannel);

  return (
    <div className="flex">
      <Sidebar />
      <ChannelBar setActiveChannel={setActiveChannel}/>
      <ContentContainer activeChannel={activeChannel} />
    </div>
  );
}

export default Chat;
