import React from "react";
import HomePage from "./pages/HomePage";
import { SocketProvider } from "./context/SocketContex";

const BandNamesApp = () => {
  return (
    <SocketProvider>
      <HomePage />
    </SocketProvider>
  );
};

export default BandNamesApp;
