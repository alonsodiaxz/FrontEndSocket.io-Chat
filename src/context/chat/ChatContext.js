import React, { createContext, useReducer } from 'react'
import { ChatReducer } from './ChatReducer';

export const ChatContext = createContext();

const initialState = {
    uid: '',
    chatActivo: null, //uid del usuario receptor del mensaje
    usuarios: [], //Todos los usuarios de la base de datos
    mensajes: [], //El chat seleccionado
    mensajesNuevos: [{
        id: 0,
        nuevo: false,
        de: null,
        para:null,
    }],
}

export const ChatProvider = ({children}) => {

    //Reducer del chat, el dispatch es la funcion que se encarga de disparar las acciones para los estados.
    const [chatState, dispatch] = useReducer(ChatReducer, initialState);

    return (
        <ChatContext.Provider value={{chatState,dispatch}}>
            {children}
        </ChatContext.Provider>
            
        
    )
}


