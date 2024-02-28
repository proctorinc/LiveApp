import express, { Request, Response, NextFunction } from "express";
import http, { IncomingMessage } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import session, { SessionData } from "express-session";
import routes from "./routes/index";
import { onConnection } from "./routes/socket";
import { db } from "./db";
import { User } from "@prisma/client";
import { requireAuth } from "./middleware";
import errorhandler from "errorhandler";

const PORT = 3000;
const app = express();
const server = http.createServer(app);

// Augment express-session with a custom SessionData object
declare module "express-session" {
  interface SessionData {
    user: User;
  }
}

interface SessionIncomingMessage extends IncomingMessage {
  session: SessionData;
}

export interface SessionSocket extends Socket {
  request: SessionIncomingMessage;
}

// Configure session
const sessionMiddleware = session({
  secret: "changeit",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 172800,
  },
});

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

// Configure Socket-IO
const io = new Server(server, {
  cors: corsOptions,
});

app.set("db", db);
app.set("socketio", io);

app.use(express.json());
app.use(cors(corsOptions));
app.use(sessionMiddleware);
app.use(routes);
app.use(errorhandler());

const wrapper = (middleware: any) => (socket: Socket, next: any) =>
  middleware(socket.request, {}, next);

io.use(wrapper(sessionMiddleware));
io.use(wrapper(requireAuth));
io.on("connection", (socket: Socket) => onConnection(io, socket));

app.get("/", (_, res: express.Response) => {
  res.json({ status: "API is running on /api" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  next();
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
