import React, { useState, useEffect, useContext } from "react";
import BandAdd from "../components/BandAdd";
import BandList from "../components/BandList";
import { SocketContext } from "../context/SocketContex";

function HomePage() {
  const { online } = useContext(SocketContext);

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
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
