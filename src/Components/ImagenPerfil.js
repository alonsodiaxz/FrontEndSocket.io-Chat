import React from "react";
import clara from "../img/clara.jpeg";
import alonso from "../img/alonso.jpeg";
import juanma from "../img/juanma.jpeg";
import ernesto from "../img/ernesto.jpeg";
import userImg from "../img/user.png";

export const ImagenPerfil = ({ user }) => {
  if (user.nombre === "clara") {
    return <img src={clara} alt="sunil" />;
  } else if (user.nombre === "Alonso") {
    return <img src={alonso} alt="sunil" />;
  } else if (user.nombre === "Juanma Porrero") {
    return <img src={juanma} alt="sunil" />;
  } else if (user.nombre === "Ernesto Plata") {
    return <img src={ernesto} alt="sunil" />;
  } else {
    return <img src={userImg} alt="sunil" />;
  }
};
