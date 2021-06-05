import React from 'react'
import clara from "../img/clara.jpeg"
import alonso from "../img/alonso.jpeg"
import juanma from "../img/juanma.jpeg"
import ernesto from "../img/ernesto.jpeg"

export const ImagenIncommingMessages = ({user}) => {
    if (user === 'clara') {   
        return(
            <img src={clara} alt="sunil"/>
        )  
   }else if (user === 'Alonso') {
    return(
        <img src={alonso} alt="sunil"/>
    )
   }else if (user === 'Juanma Porrero') {
    return(
        <img src={juanma} alt="sunil"/>
    )
   }else{
    return(
        <img src={ernesto} alt="sunil"/>
    )  
   }
}
