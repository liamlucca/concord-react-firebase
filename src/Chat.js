import logo from './logo.svg';
import './styles/App.css';
import './styles/index.css';
import Sidebar from './components/Chat/Sidebar';
import ChannelBar from './components/Chat/ChannelBar';
import ContentContainer from './components/Chat/ContentContainer';

function Chat() {
  return (
    <div className="flex">
      <Sidebar />
      <ChannelBar />
      <ContentContainer />
    </div>
  );
}

export default Chat;
