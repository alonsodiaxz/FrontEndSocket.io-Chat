import React, { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthContext';
import { ChatContext } from '../context/chat/ChatContext';
import { SocketContext } from '../context/SocketContext';
import { store } from 'react-notifications-component';

export const SendMessages = () => {

    const [mensaje, setmensaje] = useState('');
    const {socket} = useContext(SocketContext);
    const {auth} = useContext(AuthContext);
    const {chatState} = useContext(ChatContext);
    const {chatActivo} = chatState;

    const onChange = ({target}) => {

        setmensaje(target.value);
    
    }

    const onSubmit = (ev) => {

        ev.preventDefault();

        if(mensaje.length === 0){ return;}
        setmensaje('');

        const message = {
            de: auth.uid,
            para: chatActivo,
            mensaje: mensaje,
            
        }

        //TODO: Emitir un evento de socket para enviar el mensaje.
        //Lo enviamos al backend para almacenarlo en la base de datos, con la estructura del esquema que hicimos al principio
        socket.emit('mensaje-personal',message);
    }

    return (
        <form onSubmit={onSubmit} className="send_messgs">
            <div className="type_msg row">
            <div className="input_msg_write col-sm-9">
                <input 
                type="text" 
                className="write_msg" 
                placeholder="Mensaje..." 
                value={mensaje}
                onChange={onChange}
                />
            </div>
            <div className="col-sm-3 text-center">
                <button className="msg_send_btn mt-3" type="submit">
                    enviar
                </button>
            </div>
            </div>
        </form>
    )
}
