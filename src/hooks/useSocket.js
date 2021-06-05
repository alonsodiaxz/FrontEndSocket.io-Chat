import { useCallback, useEffect,  useState } from 'react';
import io from 'socket.io-client';


export const useSocket = ( serverPath ) => {
    
    //Dos variables de estado para el socket y online
    const [socket, setsocket] = useState(null)
    const [online, setOnline] = useState(false);

    const conectarSocket = useCallback(() => {

        const token = localStorage.getItem('token');
            
        const socketTemp = io.connect( serverPath, 
            {transports: ['websocket'],
            autoConnect: true, //Deja la conexión conectada
            forceNew: true, //Crea una nueva conexión
            query: {
                'x-token': token //Mandar el token como parámetro, el 'x-token' es el nombre que hemos querido asignarle
            }
        });

        setsocket(socketTemp);
        
    }, [serverPath],)

    //Si hay socket que se desconecte en caso contrario no hace nada. Esp significa la '?'
    const desconectarSocket = useCallback(() => { 
        socket?.disconnect();
    }, [socket],)

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}