import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = import.meta.env.PROD ? undefined : "http://localhost:3000";

export const socket = io("http://localhost:4000");

// export const socket = io("http://localhost:4000", { multiplex: false }); //for testing different users
