import React, { useContext } from 'react'
import { ChatSelect } from '../Components/ChatSelect'
import { InboxPeople } from '../Components/InboxPeople'
import { Messages } from '../Components/Messages'
import { ChatContext } from '../context/chat/ChatContext'
import '../css/chat.css'

export const ChatPage = () => {

    const {chatState} = useContext(ChatContext)
    return (
        <div className="messaging">
            <div className="inbox_msg">

                <InboxPeople/>
                {
                    (chatState.chatActivo)
                    ?<Messages/>
                    :<ChatSelect/>
                }

            </div>
        </div>
    )
}
