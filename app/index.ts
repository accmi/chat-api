import { ChatApiServer } from './server';
import { hostParams } from './config';
import { userRoutes } from './routes/user';

const { host, port } = hostParams;
const server = new ChatApiServer({
    host,
    port,
});

server.start();
server.setRoutes(userRoutes);
