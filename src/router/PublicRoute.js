import React from 'react'
import { Redirect, Route } from 'react-router'

export const PublicRoute = ({
    isAuthenticated, //Propiedad a recibir
    component: Component, //Componente que quiero renderizar
    ...rest //Resto de propiedades que pueden enviarme a esta ruta
}) => {
    
    return (
        <Route {...rest}
            component={(props) => (
                (!isAuthenticated)
                ? <Component {...props}/>
                : <Redirect to="/"/>

            )}
        />
        
    )
}
