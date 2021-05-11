import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContex";

const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  const cambioNombre = (e, id) => {
    const newName = e.target.value;
    const updateBands = bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
    setBands(updateBands);
  };

  const onPerdioFoco = (id, name) => {
    socket.emit("cambiar-nombre-banda", { id, name });
  };

  const votar = (id) => {
    socket.emit("votar-banda", id);
  };

  const borrar = (id) => {
    socket.emit("borrar-banda", id);
  };

  const crearRows = () => {
    return bands.map((band) => {
      return (
        <tr key={band.id}>
          <td>
            <button onClick={() => votar(band.id)} className="btn btn-primary">
              {" "}
              +1
            </button>
          </td>
          <td>
            <input
              className="form-control"
              value={band.name}
              onChange={(e) => cambioNombre(e, band.id)}
              onBlur={() => onPerdioFoco(band.id, band.name)}
            />
          </td>
          <td>
            <h3>{band.votes}</h3>
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => borrar(band.id)}>
              {" "}
              Borrar
            </button>
          </td>
        </tr>
      );
    });
  };

  console.log(`object`);

  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th>-</th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};

export default BandList;
