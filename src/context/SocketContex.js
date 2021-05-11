import { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

export const SocketProvider = (props) => {
  const { children } = props;

  // const { socket, online } = useSocket("https://www.bmosoluciones.com/");
  const { socket, online } = useSocket("http://localhost:8080/");

  return (
    <SocketContext.Provider
      value={{
        socket,
        online,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
