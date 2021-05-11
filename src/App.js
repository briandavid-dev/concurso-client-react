import { useState, useEffect } from "react";
import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";
import React from "react";
import { useSocket } from "./hooks/useSocket";

function App() {
  const [bands, setBands] = useState([]);

  // const { socket, online } = useSocket("https://www.bmosoluciones.com/");
  const { socket, online } = useSocket("http://localhost:8080/");

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
