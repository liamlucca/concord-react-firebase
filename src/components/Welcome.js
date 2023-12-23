import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import "./welcome.css";

const Welcome = () => {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <main className="welcome">
      <header className="header">
        <h1>Concord</h1>
      </header>

      <section className="features">
        <div className="feature">
          <h2>Comunicación en tiempo real</h2>
          <p>Chatea con amigos y colegas en tiempo real.</p>
        </div>

        <div className="feature">
          <h2>Un lugar propio para ti y tu grupo</h2>
          <p>Crea canales propios y participa en conversaciones.</p>
        </div>

        <div className="feature">
          <h2>Sube imagenes y diviertete</h2>
          <p>Si te aburre simplemente textear prueba a subir imagenes como respuestas</p>
        </div>
      </section>

      <button onClick={googleSignIn} className="login-button">
        Iniciar sesión
      </button>

      <div className="additional-content">
        <h3>¡Descubre más sobre Concord!</h3>
        <p>Se nos ocurrio inventar concord debido a la necesidad que teniamos de tener un chat rapido para comunicarnos mientras estabamos operando.</p>
        <p>Así que al momento pensamos en Discord pero este consumia muchos recursos para usarlo como proceso secundario</p> 
        <p>así que teniamos que hacerlo más simple, menos pesado, más facil de usar y sobre todo que estuviera en un lado que no molestara </p>
        <p> ni añadiera un uso muy significante de recursos, así nació la idea de la aplicacion web Concord.</p>
      </div>
    </main>
  );
};

export default Welcome;
