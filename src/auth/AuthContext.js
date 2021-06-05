import React,{ createContext, useCallback, useContext, useState } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";


export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null,
};

export const AuthProvider = ({children}) => {

    //Variable de estado de la autenticación
    const [auth, setauth] = useState(initialState)
    const {dispatch} = useContext(ChatContext)

    const login = async(email, password) => {
        const resp = await fetchSinToken('login', {email, password}, 'POST' );
        const {usuarioBD} = resp

        if(resp.ok){
            localStorage.setItem('token', resp.token);
            setauth({
               uid: usuarioBD.uid,
               checking: false,
               logged: true,
               name: usuarioBD.nombre,
               email: usuarioBD.email, 
            });

            console.log('Autenticado!');
            return true;
        }
        
        return resp.msg
        
    }
    const register = async(nombre, email, password) => {

        const resp = await fetchSinToken('login/new',{nombre,email,password},'POST');
        const {usuario} = resp

        if(resp.ok){
            localStorage.setItem('token',resp.token);
            setauth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
            });
            console.log('Registrado!');
            return true;
        }
      

        return resp.msg

    }

    //Utilizamos el useCallback porque lo vamos a colocar dentro de un useEffect, para que se 
    //memorice y no se dispare ese efecto constantemente 
    const verificarToken = useCallback(async() => { 
        const token = localStorage.getItem('token');

        if(!token){

            setauth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })
            return false;
        }
        const res = await fetchConToken('login/renew');
        
        if(res.ok){

            localStorage.setItem('token', res.token);
            const {usuario}  = res;

            setauth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email,
            })

            console.log('Autenticado!')
            return true;

        }else{
             setauth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null,
            })
            return false;
        }
        
    },[])

    const logout = () => {
        localStorage.removeItem('token');
        setauth({
            checking: false,
            logged: false,
        })

        dispatch({

            type: types.cerrarSesion,
        })

        
    }

    return (
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificarToken,
            logout,
        }}>
            {children}
        </AuthContext.Provider>

    )
}
