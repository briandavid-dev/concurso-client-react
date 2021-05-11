import { useMemo, useEffect, useState } from "react";
import io from "socket.io-client";

export const useSocket = (serverPath) => {
  // LOCAL
  // const socket = io("http://localhost:8080/", {
  //   path: "/projects/bands/socket.io",
  //   transports: ["websocket"],
  // });

  // PROD
  const socket = useMemo(
    () =>
      io(serverPath, {
        path: "/projects/concurso-server/socket.io",
        // transports: ["websocket"],
      }),
    [serverPath]
  );

  const [online, setOnline] = useState(false);

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

  return {
    socket,
    online,
  };
};
