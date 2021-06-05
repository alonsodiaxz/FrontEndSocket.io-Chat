import React, { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext'
import { SocketContext } from '../context/SocketContext'
import { fetchConToken } from '../helpers/fetch'
import { scrollToBottom } from '../helpers/scrollToBottom'
import { types } from '../types/types'
import { ImagenPerfil } from './ImagenPerfil'
import { store } from 'react-notifications-component';

export const SidebarChatItem = ({usuario}) => {

    const {chatState, dispatch} = useContext(ChatContext)
    const {nuevo, quitarNotificacion} = useContext(SocketContext)
    const {chatActivo, mensajesNuevos} = chatState;
    var mismoUsuario = !nuevo;

    const activarChat = async() => {

        dispatch({
            type: types.activarChat,
            payload: usuario.uid,
        });

        //Emitir peticion REST al backend para obtener los mensajes de la base de datos de ese usuario.
        const respuesta = await fetchConToken(`mensajes/${usuario.uid}`,'GET');
        const {mensajes} = respuesta;

        dispatch({
            type: types.cargarMensajes,
            payload: mensajes,
        });

        quitarNotificacion(true);

        dispatch({
            type: types.quitarNotificaciones,
            
        });

        //TODO: Hacer scroll automático
        scrollToBottom('mensajes');

    }

    const mostrarNotificacion = async() => {
        const respuesta = await fetchConToken(`mensajes/${usuario.uid}`,'GET');
        const {mensajes} = respuesta;
        const ultimoMensaje = mensajes[mensajes.length-1]

        const notificacion = {
            title: 'Nuevo Mensaje',
            message: `${ultimoMensaje}`,
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        }

        const noti = store.addNotification(notificacion);
        return(noti)
    }

    return (
      
        <div className={`chat_list  ${ (usuario.uid === chatActivo) && 'active_chat' }`} //Resaltar el chat seleccionado.
        onClick={ activarChat}>
            
            {/*active_chat*/}
            <div className="chat_people">
                <div className="chat_img" >
                    <ImagenPerfil user={usuario}/>
                </div>
                <div className="chat_ib">
                    <h5> {usuario.nombre} </h5>
                    {
                        (usuario.online)
                        ?<span className="text-success">Online</span> //Si esta online = true, le pone online
                        :<span className="text-danger">Offline</span> //Si esta online = false, le pone offline
                    }
                </div>
                <div className="mensaje-entrante">
                    {
                        mensajesNuevos.map( (msg) => {
                        if(nuevo && usuario.uid === msg.de && !mismoUsuario && chatState.chatActivo!== msg.de ){
                            mismoUsuario = true;
                            
                            return(<span key={msg.id} className="nuevo-msg"> Nuevo mensaje</span>);
                            
                        }else{
                            return(<span key={msg.id} className="nuevo-msg"> </span>)
                        }
                        })
                    }
                     
                </div>
               
            </div>
        </div>
    )
}
