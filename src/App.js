import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/App.css";
import Welcome from "./components/Welcome";

import Chat from "./components/Chat";


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {!user ? (
        <Welcome />
      ) : (
        <>
          <Chat user={user}/>
        </>
      )}
    </div>
  );
}

export default App;