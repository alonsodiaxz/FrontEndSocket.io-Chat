const baseUrl = process.env.REACT_APP_API_URL;

export const fetchSinToken = async (endpoint, data, method = "GET") => {
  //Method (tipo de peticion),Por defecto, una peticion get.

  const url = `${baseUrl}/${endpoint}`;
  console.log(url);

  if (method === "GET") {
    const res = await fetch(url);
    const respuesta = await res.json();
    console.log(respuesta);
    return respuesta; //Devuelve la respuesta a la petición y la convierte en json.
  } else {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data), //Hay que mandar la data serializada
    });
    return await res.json();
  }
};

export const fetchConToken = async (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    const res = await fetch(url, {
      headers: {
        "x-token": token,
      },
    });
    return await res.json();
  } else {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data), //Hay que mandar la data serializada
    });
    return await res.json();
  }
};
