//Un reducer NO obtiene información del exterior, es decir, no importa nada todo se basa en el state y en las acciones. Siempre tiene que

import { types } from "../../types/types";

//regresar un state, tiene que ser una función síncrona. Siempre tiene que estar regresando un nuevo state.
export const ChatReducer = (state, action) => {
  /*const initialState = {
        uid: '',
        chatActivo: null, //uid del usuario receptor del mensaje
        usuarios: [], //Todos los usuarios de la base de datos
        mensajes: [], //El chat seleccionado
        mensajesNuevos: [{
            id: null ,
            nuevo: false,
            de: null,
            para:null,
        }],
    }*/

  switch (action.type) {
    case types.usuariosCargados:
      return {
        ...state,
        usuarios: [...action.payload],
      };

    case types.activarChat:
      if (state.chatActivo === action.payload) return state;

      return {
        ...state,
        chatActivo: action.payload,
        mensajes: [],
      };

    case types.nuevoMensaje:
      if (
        state.chatActivo === action.payload.de ||
        state.chatActivo === action.payload.para
      ) {
        //Si el uid del chatActivo es igual al uid de la persona que me envia el mensaje.

        return {
          ...state,
          mensajes: [...state.mensajes, action.payload],
        };
      } else {
        return state;
      }

    case types.cargarMensajes:
      return {
        ...state,
        mensajes: [...action.payload],
      };

    case types.cerrarSesion:
      return {
        uid: "",
        chatActivo: null, //uid del usuario receptor del mensaje
        usuarios: [], //Todos los usuarios de la base de datos
        mensajes: [], //El chat seleccionado
      };

    case types.notificacionMensaje:
      if (action.payload.de || action.payload.para) {
        console.log(state);
        //Si el uid del chatActivo es igual al uid de la persona que me envia el mensaje.
        if (state.mensajesNuevos) {
          return {
            ...state,
            mensajesNuevos: [...state.mensajesNuevos, action.payload],
          };
        }

        return {
          ...state,
          mensajesNuevos: [null, action.payload],
        };
      } else {
        return state;
      }

    case types.quitarNotificaciones:
      return {
        ...state,
        mensajesNuevos: [],
      };

    default:
      return state;
  }
};
