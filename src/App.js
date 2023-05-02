import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import ChannelBar from './components/ChannelBar';
import ContentContainer from './components/ContentContainer';
import TopNavigation from './components/TopNavigation';



function App() {
  return (
    <div className="flex">
      <Sidebar />
      <ChannelBar />
      <ContentContainer />
    </div>
  );
}

export default App;
