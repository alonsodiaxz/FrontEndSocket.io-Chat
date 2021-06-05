import { useContext } from 'react'
import { ChatContext } from '../context/chat/ChatContext'

export const ExtraerUsuario = (msg) => {
    
    const {chatState} = useContext(ChatContext);
    const usuarios = chatState.usuarios;
    var  nombre = '';

    usuarios.map((user) => {

        if(user.uid === msg.de){
            nombre = user.nombre
        }
    });
    return  nombre;
}
