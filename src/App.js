import logo from './logo.svg';
import './App.css';
import SideBar from './components/SideBar';
import ChannelBar from './components/ChannelBar';
import ContentContainer from './components/ContentContainer';
import TopNavigation from './components/TopNavigation';



function App() {
  return (
    <div className="flex">
      <SideBar />
      <ChannelBar />
      <ContentContainer />
    </div>
  );
}

export default App;
