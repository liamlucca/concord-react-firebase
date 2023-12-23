import React, { useEffect, useState, useCallback } from 'react';
import { db } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'; 
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import Swal from 'sweetalert2';


const storage = getStorage();

const ServerConfigPopup = ({ activeServer, isConfigOpen, setConfigOpen, user }) => {

  const [newImage, setNewImage] = useState(null);

    /*----------------------------Logo del servidor-----------------------------------*/
    const changeServerPhoto = useCallback(async () => {
        // Verifica si se ha seleccionado una nueva imagen
        if (!newImage) {
          //alert('Selecciona una nueva imagen para el servidor.');
          return;
        }

        // Sube la nueva imagen al servidor
        const imageRef = ref(storage, `servers/${activeServer.id}/config/logo`);
        const metadata = {
          contentType: newImage.type, // Usa el tipo de la imagen seleccionada
        };
    
        try {
          await uploadBytes(imageRef, newImage, metadata);
          const iconUrl = await getDownloadURL(imageRef);
    
          // Actualiza la URL de la imagen en la base de datos
          const docRef = doc(db, `servers/${activeServer.id}`);
          const docData = {
            iconUrl: iconUrl,
          };
    
          await updateDoc(docRef, docData); // Actualiza el documento existente en Firestore
    
          // Cierra el menú emergente
          setConfigOpen(false);
        } catch (error) {
          console.error('Error al cargar la imagen:', error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [newImage]);  
  /*-----------------------------------------------------------------------------------*/

  useEffect(() => {
    if (newImage && activeServer && activeServer.id !== "GlobalServer") {
      changeServerPhoto();
    }
  }, [newImage, activeServer, changeServerPhoto]);

  if (!isConfigOpen || activeServer.id === "GlobalServer") return null;  

  const closeMenu = () => {
    setConfigOpen(false);
  };

    /*----------------------------Borrar el servidor-----------------------------------*/
    const deleteServer = async () => {
        
        //Prompt 1
        const {value: confirmText} = await Swal.fire({
            //Estilo
            background: '#2d3748',
            color:'#DC2626',
            confirmButtonColor: '#DC2626',
            cancelButtonColor: '#718096',
            //Datos
            title: 'Para confirmar que estás segurisimo de borrar el servidor escribime: "QUIERO BORRAR EL SERVIDOR"',
            input: 'text',
            confirmButtonText: 'Confirmar',
        });
    
        if(confirmText !== "QUIERO BORRAR EL SERVIDOR" && confirmText !== '"QUIERO BORRAR EL SERVIDOR"') 
        {return;}

          try {
            // Eliminar archivos en Firebase Storage

            const storageRef = ref(storage, `servers/${activeServer.id}`);
            await deleteObject(storageRef)
            .then(() => {
              console.log('Carpeta eliminada exitosamente');
            })
            .catch((error) => {
              console.error('Error al eliminar la carpeta:', error);
            });

            // Elimina el servidor desde Firebase
            const serverRef = doc(db, `servers/${activeServer.id}`);
            await deleteDoc(serverRef);

            // Elimina el servidor desde Firebase del user
            const userRef = doc(db, `users/${user.uid}/joinedServers/${activeServer.id}`);
            await deleteDoc(userRef);
    
            // Cierra el menú emergente después de borrar el servidor
            setConfigOpen(false);
          } catch (error) {
            console.error('Error al borrar el servidor:', error);
          }
      };

    /*-------------------------------------------------------------------------------------*/
    return (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-base-100 dark:bg-gray-800 rounded p-6 shadow-md w-96 z-50">
            <h2 className="text-xl mb-4 text-green-400">Configuración del Servidor</h2>
            <input
              type="file"
              accept="image/*"
              id="changeServerLogo"
              onChange={(e) => setNewImage(e.target.files[0])}
              style={{ display: 'none' }}
            />
            <div className="mb-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={() => document.getElementById('changeServerLogo').click()}>
                Cambiar Logo
              </button>
            </div>
            <div className="mb-4">
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" onClick={deleteServer}>
                Borrar Servidor
              </button>
            </div>
            <button className="mt-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600" onClick={closeMenu}>
              Cerrar
            </button>
          </div>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
        </div>
      );
    };

export default ServerConfigPopup;