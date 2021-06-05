import React from 'react'
import {ExtraerUsuario} from '../helpers/ExtraerUsuario.js'
import { horaMes } from '../helpers/horaMes'
import { ImagenIncommingMessages } from './ImagenIncommingMessages.js';


export const IncomingMessage = ({msg}) => {

    const reconvertirFecha = horaMes(msg.createdAt);

    const nombre = ExtraerUsuario(msg);

    return (
     
        <div className="incoming_msg">
            <div className="incoming_msg_img">
                <ImagenIncommingMessages user={nombre}/>
            </div>
            <div className="received_msg">
                <div className="received_withd_msg">
                    <p>{msg.mensaje}</p>
                    <span className="time_date"> {reconvertirFecha}</span>
                </div>
            </div>
        </div>
    
    )
}

