import {animateScroll} from 'react-scroll'

export const scrollToBottom = (id) => {

    animateScroll.scrollToBottom({
        containerId: id,
        duration: 0, //Tiempo que emplea la animación
    })
    
}

export const scrollToBottomAnimated = (id) => {

    animateScroll.scrollToBottom({
        containerId: id,
        duration: 250,
    })
    
}
