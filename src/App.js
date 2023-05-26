import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/App.css";
import Welcome from "./components/Welcome";

import Chat from "./Chat";


function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      {!user ? (
        <Welcome />
      ) : (
        <>
          <Chat />
        </>
      )}
    </div>
  );
}

export default App;