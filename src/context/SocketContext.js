import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { scrollToBottomAnimated } from '../helpers/scrollToBottom';
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types';
import { ChatContext } from './chat/ChatContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
    //http://localhost:8080/
    //https://serverchatsocketio.herokuapp.com/
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://serverchatsocketio.herokuapp.com/');
    const {auth} = useContext(AuthContext)
    const {dispatch} = useContext(ChatContext);
    const [nuevo, setNuevo] = useState(false);
    

    //Los useEffect detectan cuando una dependencia suya cambia su valor y hacen lo correspondiente, en este caso cuando auth pasa a logged
    //se conecta al backend.
    useEffect(() => {

        if(auth.logged){
            conectarSocket();
        }
        
    }, [auth, conectarSocket])

    useEffect(() => {

        if(!auth.logged){
            desconectarSocket();
        }
        
    }, [auth, desconectarSocket])

    //Escuchar cambios en los usuarios conectados, el estado del socket puede cambiar.
    useEffect(() => {

       socket?.on('lista-usuarios', (usuarios) => {
           dispatch({
               type: types.usuariosCargados,
               payload: usuarios,
           });

       });
        
    }, [socket, dispatch]);

    useEffect(() => {
       socket?.on('mensaje-personal', (mensaje) => {

            //Disparamos la acción al reducer para cargar los mensajes, en el state.
            dispatch({
                type: types.nuevoMensaje,
                payload: mensaje,
           });

            const mensajesNuevo = {
                id: Math.random()*(20000-1)+1,
                nuevo: true,
                de: mensaje.de,
                para: mensaje.para,
            }

           dispatch({
               type: types.notificacionMensaje,
               payload: mensajesNuevo,
           });

           setNuevo(true);

           scrollToBottomAnimated('mensajes');
       });

       

    }, [socket, dispatch]);

    const quitarNotificacion = (cambiar) => {
        if(cambiar){
            setNuevo(false);
        }
    }
    
    return (
        <SocketContext.Provider value={{ socket, online, nuevo,quitarNotificacion}}>
            { children }
        </SocketContext.Provider>
    )
}