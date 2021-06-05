import React from 'react'


export const MensajeEntrante = (newMssg) => {
    
    const usuario = newMssg.user.uid;
    const mensajeDe = newMssg.mensaje.de;
    const nuevoMensaje = newMssg.mensaje.nuevo;
    const mensajePara = newMssg.mensaje.para;
    const login = newMssg.login.uid;
    
    
    if (nuevoMensaje && usuario === mensajeDe && mensajePara === login) {

        return(
            <span className="nuevo-msg"> Nuevo mensaje</span>
        )

       
    }else{
        return(
            <span> </span>
        ) 
    }

    
}
