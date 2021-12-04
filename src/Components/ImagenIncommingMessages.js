import React from "react";
import clara from "../img/clara.jpeg";
import alonso from "../img/alonso.jpeg";
import juanma from "../img/juanma.jpeg";
import ernesto from "../img/ernesto.jpeg";
import userImg from "../img/user.png";

export const ImagenIncommingMessages = ({ user }) => {
  if (user === "clara") {
    return <img src={clara} alt="sunil" />;
  } else if (user === "Alonso") {
    return <img src={alonso} alt="sunil" />;
  } else if (user === "Juanma Porrero") {
    return <img src={juanma} alt="sunil" />;
  } else if (user === "Ernesto Plata") {
    return <img src={ernesto} alt="sunil" />;
  } else {
    return <img src={userImg} alt="sunil" />;
  }
};
