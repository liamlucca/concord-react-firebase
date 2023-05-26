import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./styles/App.css";
import Welcome from "./components/Welcome";

import Chat from "./components/Chat";
import { useState } from "react";


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