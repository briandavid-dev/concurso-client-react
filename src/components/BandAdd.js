import React, { useContext, useRef } from "react";
import { SocketContext } from "../context/SocketContex";

const BandAdd = () => {
  const refForm = useRef();

  const { socket } = useContext(SocketContext);

  const crearBanda = (nombre) => {
    socket.emit("nueva-banda", { nombre });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (refForm.current.nombre.value.trim().length > 0) {
      crearBanda(refForm.current.nombre.value.trim());
      refForm.current.reset();
    }
  };

  return (
    <>
      <h3>Agregar Banda</h3>

      <form onSubmit={onSubmit} ref={refForm}>
        <input
          id="nombre"
          className="form-control"
          placeholder="Nuevo nombre de bandas"
        />
      </form>
    </>
  );
};

export default BandAdd;
