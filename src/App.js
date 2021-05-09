import { useState, useEffect } from "react";
import io from "socket.io-client";
import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";
import React from "react";

const connectSocketSerer = () => {
  // LOCAL
  // const socket = io("http://localhost:8080/", {
  //   path: "/projects/bands/socket.io",
  //   transports: ["websocket"],
  // });

  // PROD
  const socket = io("https://www.bmosoluciones.com/", {
    path: "/projects/concurso-server/socket.io",
    // transports: ["websocket"],
  });

  return socket;
};

function App() {
  const [socket] = useState(connectSocketSerer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`connect`);
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
  }, [socket]);

  const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  const borrar = (id) => {
    socket.emit("borrar-banda", id);
  };

  const cambiaNombre = (id, name) => {
    socket.emit("cambiar-nombre-banda", { id, name });
  };

  const crearBanda = (nombre) => {
    socket.emit("nueva-banda", { nombre });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:{" "}
          {online ? (
            <strong className="text-success">Online</strong>
          ) : (
            <strong className="text-danger">Offline</strong>
          )}
        </p>
      </div>

      <h1>Band Names</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            votar={votar}
            borrar={borrar}
            cambiaNombre={cambiaNombre}
          />
        </div>
        <div className="col-4">
          <BandAdd crearBanda={crearBanda} />
        </div>
      </div>
    </div>
  );
}

export default App;
