import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMessages } from './SendMessages'

export const Messages = () => {

    const {chatState} = useContext(ChatContext);
    const {auth} = useContext(AuthContext);

    return (
           
         <div className="mesgs">

                {/*<!--} Historia inicio -->*/}              
                <div 
                id="mensajes"
                className="msg_history">

                {
                    chatState.mensajes.map((msg)=>(
                        (msg.para === auth.uid) //Si el uid del para es para mi, entonces se almacena en incoming mensajes, sino en outgoing
                        ? <IncomingMessage key={msg._id} msg={msg}/> //La key es un identificador único de cada componente, en este caso de los mensajes de entrada.
                        : <OutgoingMessage key={msg._id} msg={msg} />
                    ))
                }
    
                </div>
                {/*<!--} Historia Fin -->*/}        

                <SendMessages/>

        </div>

    )
}
